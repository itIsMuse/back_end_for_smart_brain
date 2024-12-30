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
            const regions = data;
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
            return fetch('https://face-ecognition-api.onrender.com/setUpInfo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch data from the backend');
                    }
                    return response.json(); // This extracts the actual data
                })
                .then((data) => {
                    console.log('Backend Response:', data); // This should log the actual data
                    return data; // Return the data for further use
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
    fetch(`https://face-ecognition-api.onrender.com/image`, {
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

        setUpJSON(inputUrl)
            .then((data) => {
                const faceLocation = calculateFaceLocation(data);
                setBoundingBox(faceLocation);
                userinfo.entries ++
                updateEntries(userinfo.id)
            })
            .catch((error) => console.error('Error:', error));
    };




const handleAuthentication = () => {
    setIsAuthenticated(true); // Update the authentication state
    setSignedIn(true)
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


//its still not working but i think i was able to get into clarifai so thats good  now i just need to understand the app enough to continue what i am doing maybe test without the backend call and see what it is outputing 