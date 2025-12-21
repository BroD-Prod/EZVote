
import { StyleSheet, Text, View, Image, Modal, TouchableOpacity, Button} from "react-native";
import {useEffect, useState} from "react";
import axios from "axios";
import placeholder from "./assets/placeholder.png";
import titleImage from "./assets/EZVote_Title-removebg.png";
import { STRAPI_URL } from "./config";

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.NavBar}>
				<NavBar />
			</View>
			<View style={styles.content}>
				<Location/>
				<ElectorateContainer/>
			</View>
		</View>
	);
}

function NavBar(){
	return (
		<View style={styles.NavBar}>
			<Image source={titleImage} style={{width: 200, height:75}}></Image>
		</View>
	);
}

function Location(){
	return (
		<View style={styles.Location}>
			<Text>Location</Text>
			<Text>Winamac, IN</Text>
		</View>
	);
}

function ElectorateContainer(){
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedCandidate, setSelectedCandidate] = useState(null);
	const [voteNum, setVoteNum] = useState(0);
	const [canidates, setCanidates] = useState([]);
	const [totalVoteNum] = useState(0);

	const addVote = () => {
		setVoteNum(prev => prev + 1);
	};

	const openModal = (canidate) => {
		setSelectedCandidate(canidate);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
		setSelectedCandidate(null);
	};

	useEffect(() => {
		async function fetchCanidates() {
			try{
				const resp = await axios.get(`${STRAPI_URL}/api/canidates?populate=Portrait`);

				const canidatesData = resp.data.data.map(canidate => {

					const relativeUrl = canidate.Portrait?.url;

					// 1. Determine the source (absolute URL vs placeholder)
                	let finalImage = placeholder;
                	if (relativeUrl) {
                    	// Clean STRAPI_URL to ensure it doesn't have a trailing slash
                    	const base = STRAPI_URL.replace(/\/$/, ""); 
                    	finalImage = `${base}${relativeUrl}`;
                	}
					
					return {
						id: canidate.id,
						name: canidate.Name,
						party: canidate.Party,
						bio: canidate.Description,
						Image: finalImage
					};
				});

				setCanidates(canidatesData);
			}catch(error){
				console.error("Failed to Fetch Canidates", error);
			}
		}
		fetchCanidates();
	}, 
	[]
	);

	return(
		<>
			<View style={styles.ElectorateContainer}>
				<Text style={{padding: 10}}>Cast Your Vote for the Supreme Leader</Text>
				<Text>{voteNum} / {totalVoteNum}</Text>
				<View style={styles.ImageRow}>
					{canidates.map(canidate => (
						<TouchableOpacity key={canidate.id} onPress={() => openModal(canidate)}>
							<Image source={{uri: canidate.Image}} style={styles.CanidateImage}></Image>
						</TouchableOpacity>
					) )}
				</View>
			</View>
			<Modal
				visible={modalVisible}
				transparent={true}
				animationType="fade"
				onRequestClose={closeModal}>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						{
							selectedCandidate && (
								<>
									<View style= {{ flexDirection: "row", justifyContent: "flex-start" }}>
										<Button title="Close" onPress={closeModal}></Button>
									</View>
									<Text style = {{padding: 10}}>{selectedCandidate.name}</Text>
									<Text style = {{padding: 10}}>{selectedCandidate.party}</Text>
									<Text style = {{padding: 10}}>{selectedCandidate.bio}</Text>
									<Button title="Vote" onPress={addVote}></Button>
								</>
							)
						}
					</View>
				</View>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	NavBar:{
		height: 125,
		width: "100%",
		backgroundColor: "#eee",
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		
	},

	content:{
		flex: 1,
		alignItems: "center",
	},

	Location:{
		padding: 20,
		borderWidth: 1,
		borderRightWidth:0,
		borderLeftWidth:0,
		borderColor: "#000",
		width: "100%",
		alignItems: "center",
		alignContent: "center",
		alignSelf: "stretch",
		borderBottomWidth:0
	},

	ElectorateContainer:{
		padding: 20,
		borderWidth: 2,
		borderRightWidth:0,
		borderLeftWidth:0,
		borderColor: "#000",
		width: "100%",
		alignItems: "center",
		alignContent: "center",
		scrollable: true,
		borderTopWidth:1,
		borderBottomWidth:1
	},

	ImageRow:{
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "center",
	},

	CanidateImage:{
		height: 100,
		width: 100,
		margin: 10,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: "#000"
	},

	modalOverlay:{
		flex:1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center"
	},

	modalContent:{
		padding: 20,
		backgroundColor: "white",
		borderRadius: 8
	},
});
