import React, {useState, useEffect} from "react";
import { Navbar, Nav, Form, Button, Col, ControlLabel, Container, Row, Image} from 'react-bootstrap';
import history from "./history";
import axios from "axios";
import userProfile from "./UserProfile";

const Dashboard = () => {
		const [fileURL, setFileURL] = useState();
		const [session, ifSession] = useState(false);
		const [placeholder, setPlaceholder] = useState("Click here to select files");
		const [fileSelected, setFileSelected] = useState(false);
		const [file, setFile] = useState();

		// axios
		// .get('http://localhost:9000/sessioncheck', {withCredentials : true})
		// .then((response) => {
		// 	if (response.status = 200)
		// 	{
		// 		ifSession(true);
		// 	}
		// })


		// An event listener function to show file info in the Form.File component
		function AddFile(event) {
			console.log(event.target.files)
			setFile(event.target.files);
			if (!event.target.files[0])
			{
				setPlaceholder("Please select a file");
				setFileSelected(false);
			}
			else {
				setPlaceholder("File selected (" + event.target.files[0].name + ")");
				setFileSelected(true);
			}
		}
		// Uploads the selected file to AWS S3 bucket
		function uploadFile() {
			// console.log(file[0].name);
			var formData = new FormData()
			var formData2 = new FormData()
		  formData.append('myFile', file[0]);
			formData2.append('myFile', file);
			console.log(formData);
			console.log(formData2);
			let axiosConfig = {
				headers: {
					'Content-Type' : 'multipart/form-data',
				}
			}
			axios
			.post('http://localhost:9000/fileUp', formData2, axiosConfig)
			.then(res => {console.log("Successfully uploaded")})
			.catch(err => {console.log(err)});
		}
		// Fetches files the user uploaded from AWS
		function getFiles() {
			var a = userProfile.getUserID();
			var values = {
				'UserID' : a
			}
			axios
				.post('http://localhost:9000/getFiles', values)
				.then((response) => {
					setFileURL(response.data);
				})
		}
		// Logs out the user from the session
		function logoutUser() {
			 history.push('/login');
			 userProfile.delUserID();
		}
		// Dashboard when the user is not logged in
		function SessionInActive() {
			return (
				<div>
					<Container className="err401">
						401 - Unauthorized!
						<br/>
						<div className="errDesc">
							<a onClick={() => history.push('/login')}> Click here to login and try again.</a>
						</div>
					</Container>
				</div>
			)
		}
		// Dashboard when the user is logged in
		function SessionActive()
		{
			if (fileSelected) {
				getFiles();
			}
			return (
				<div>
	        <Navbar bg="primary" variant="dark">
	            <Navbar.Brand>AWS Image Uploader</Navbar.Brand>

	            <Navbar.Toggle aria-controls="basic-navbar-nav" />
	            <Navbar.Collapse id="basic-navbar-nav">
	                <Nav className="mr-auto"> </Nav>
									<Button variant="primary" onClick={() => logoutUser()}> Logout </Button>
	            </Navbar.Collapse>
	        </Navbar><br/><br/>
					<Form>
						<Form.Row className="justify-content-md-center" >
							<Form.Group as={Col} md="6">
								<Form.File
									id="photo"
									name="photo"
									accept=".jpg, .png, .jpeg, .jfif |image/*"
									onChange={AddFile.bind(this)}
									label={placeholder}
									custom
								/>
							</Form.Group>
						</Form.Row>
						<div className="text-center"> <br />
							<Button disabled={!fileSelected} onClick={() => uploadFile()}> Upload </Button>
						</div>
					</Form>
					<br /><br />
					<Container className="dash">
					  <Row>
					    <Col xs={6} md={4}>
					      <Image src={fileURL} fluid rounded/>
							</Col>
						</Row>
					</Container>
				</div>
			)
		}
		function renderIt() {
			if (!userProfile.getUserID()) {
				return SessionInActive();
			}
			else {
				return SessionActive();
			}
		}
		return (
			<div>
				{
					renderIt()
				}
			</div>
		)
}


export default Dashboard;

// <Nav.Link href="/">Home</Nav.Link>
// <Nav.Link href="/About">About</Nav.Link>
// <Nav.Link href="/Contact">Contact</Nav.Link>
// <Nav.Link href="/Products">Products</Nav.Link>
