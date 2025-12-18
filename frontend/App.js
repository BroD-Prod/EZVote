
import { StyleSheet, Text, View, Image, Modal, TouchableOpacity, Button} from "react-native";
import {useEffect, useState} from "react";
import axios from "axios";

const STRAPI_URL = "http://localhost:1337";

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
			<Text>EZVote</Text>
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

					const attributes = canidate?.attributes;

					const rawUrl = attributes?.Portrait?.data.attributes.url;

					const imageUrl = `${STRAPI_URL}${rawUrl}`;

					return {
						id: canidate.id,
						name: attributes.Name,
						bio: canidate.attributes.bio,
						Image: {uri: imageUrl}
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
				<Text>{voteNum}</Text>
				<View style={styles.ImageRow}>
					{canidates.map(canidate => (
						<TouchableOpacity key={canidate.id} onPress={() => openModal(canidate)}>
							<Image source={canidate.Image} style={styles.CanidateImage}></Image>
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
									<Button title="Close" onPress={closeModal}></Button>
									<Text>{selectedCandidate.name}</Text>
									<Text>{selectedCandidate.bio}</Text>
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
		paddingBottom: 10,
	},

	content:{
		flex: 1,
		alignItems: "center",
	},

	Location:{
		padding: 20,
		borderWidth: 1,
		borderColor: "#000",
		width: "100%",
		alignItems: "center",
		alignContent: "center",
		alignSelf: "stretch",
	},

	ElectorateContainer:{
		marginTop: 5,
		padding: 20,
		borderWidth: 1,
		borderColor: "#000",
		width: "100%",
		alignItems: "center",
		alignContent: "center",
		scrollable: true,
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
