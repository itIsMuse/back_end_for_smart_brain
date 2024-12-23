import React, {useState, useEffect, useRef} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink, useNavigate} from 'react-router-dom';
import Nav from './components/Nav/Nav'
import Logo from './components/Logo/Logo'
import InputText from './components/InputForm/InputText'
import FaceRecognition from './components/FaceRecognition'
import './App.css'
import ParticlesComponent from './components/particles'
import Rank from './components/Rank'
import SignIn from './SignIn form/SignIn'
import Register from './components/Register/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data } from 'autoprefixer';


const App = () => {



const navigate = useNavigate()
    const [boundingBox, setBoundingBox] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [route, setRoute] = useState('')
    const [signedIn, setSignedIn] = useState('false')

    const [userinfo, setUserinfo] = useState({
                "id" : "",
                'name': "",
                'email': "",
                'password': "",
                'entries': 0,
                'Date-joined': new Date
    })

    const loadUser = (data)=>{
        setUserinfo({
          "id": data.id,
          "name": data.name,
          "email": data.email,
          "password": data.password,
          "entries": data.entries,
          "Date-joined": data.Date
         })
console.log(userinfo)
    }

    
       

    const calculateFaceLocation = (data) => {
            const regions = data.outputs[0].data.regions;
            const image = document.getElementById('img')
            const imageWidth = image.width
            const imageHeight = image.height
            // Calculate x, y, width, height from the bounding box
            
            return regions.map(box =>{
                const boundingBox = box.region_info.bounding_box
                return{
                     x : boundingBox.left_col * imageWidth,
             y : boundingBox.top_row * imageHeight,
             width : (boundingBox.right_col - boundingBox.left_col) * imageWidth,
             height : (boundingBox.bottom_row - boundingBox.top_row) * imageHeight,
                }
            })
        }
        ;
       

   

        const setUpJSON = (imageUrl) => {
            return fetch('http://localhost:4500/setUpInfo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch data from the backend');
                    }
                    return response.json();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        };
        


// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id


const [inputUrl, setInputUrl] = useState('');
const [box, setBox] = useState(null)


const onInputChange = (event) => { 
setInputUrl(event.target.value)
}

const updateEntries = (id) => {
    fetch(`http://localhost:4500/image`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }) // Send the actual id in the request body
    })
    .then(response => response.json())
    .then(data => {
        console.log('Updated entries:', data); // Log the updated entries
    })
    .catch(err => {
        console.error('Error updating entries:', err); // Handle errors
    });
};


const onButtonSubmit = () => {
    inputUrl

    fetch('/api/v2/models/' + 
        'face-detection' + "/versions/" + '6dc7e46bc9124c5c8824be4822abe105' + "/outputs", 
        setUpJSON(inputUrl))
    .then(response => response.json())
    .then(result => {
        const faceLocation = calculateFaceLocation(result);
        setBoundingBox(faceLocation)
    })
    .catch(error => console.log('error', error));

    userinfo.entries ++
    updateEntries(userinfo.id)
}



const handleAuthentication = () => {
    setIsAuthenticated(true); // Update the authentication state
    navigate('/home'); // Navigate to the home route
  };    

  const removeAuthentication = ()=>{
    setIsAuthenticated(false)
  }


const handleRegister = ()=>{
    handleAuthentication()
    setSignedIn(true)
}

const handleSignInOn = ()=> {
    setSignedIn(true)
}
const handleSignInOff = () => {
    setSignedIn(false)
}



  return (

      <div className="App">
        <ToastContainer/>
        <ParticlesComponent id="particle" />
        <Nav removeAuthentication={removeAuthentication} signedIn ={signedIn} handleSignInOff ={handleSignInOff} />

        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn onAuthenticate={handleAuthentication} signedIn = {handleSignInOn}  loadUser = {loadUser} />} />
          <Route path="/register" element={<Register handleRegister={handleRegister} onAuthenticate = {handleAuthentication} signedIn = {handleSignInOn}/>} />
          <Route
            path="/home"
            element={
              <div>
                <Logo />
                <Rank name = {userinfo.name} entries = {userinfo.entries}/>
                <InputText onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
                <FaceRecognition boundingBox={boundingBox} imageBox={inputUrl} />
              </div>
            }
          />
        </Routes>
      </div>
  )
}

export default App


// next up will be to connect my entriees with the database so it can give me my count