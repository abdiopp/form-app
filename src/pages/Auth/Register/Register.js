import React, { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, firestore, storage } from "./../../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../../../context/AuthContext";

const initialState = { email: "", password: "", displayName: '', dp: '' };


export default function Register() {
    const navigate = useNavigate()


    const [state, setState] = useState(initialState);
    const [file, setFile] = useState({});
    const [user, setUser] = useState({});

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const userCur = user.email;
                setUser(user)
                // ...
            } else {
                // User is signed out

                // ...
            }
        });

    }, [])


    console.log('user', user)


    const handleRegister = (e) => {
        e.preventDefault();



        const { email, password } = state;



        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                userImage()
                // navigate("/");

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error', error)
                // ..
            });


    };

    const userImage = async () => {
        let { displayName } = state
        const storageRef = ref(storage, `userImages/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    let formData = { displayName }


                    let userData = { ...formData, downloadURL }
                    createUserProfile(userData)
                });
            }
        );
    }

    const createUserProfile = async (userData) => {
        const { displayName, downloadURL } = userData;

        updateProfile(auth.currentUser, {
            displayName: displayName, photoURL: downloadURL
        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });

    }
    return (
        <section className='register'>
            <div className='auth' id='login'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <div className="card border-0 shadow p-2 p-md-3 p-lg-4">
                                <div className="row">
                                    <div className="col">
                                        <h3 className='mb-4 fw-bold'>Sign up Now</h3>
                                    </div>
                                </div>
                                <form onSubmit={handleRegister}>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="displayName">UserName</label>
                                            <input type="text" className='form-control' placeholder='Enter Your displayName' onChange={handleChange} name='displayName' />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="dp">DP</label>
                                            <input type="file" className='form-control' placeholder='select image' onChange={e => { setFile(e.target.files[0]) }} name='dp' />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className='form-control' placeholder='Enter Your Email' onChange={handleChange} name='email' />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className='form-control' placeholder='Enter Your password' onChange={handleChange} name='password' />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <button type="submit" className='btn btn-info w-100'>
                                                Sign Up

                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col">
                                        <Link to='/auth' className='mb-0 text-center' >Already a user? SignIN</Link>
                                        <br />
                                        <Link to='/' className='mb-0 btn btn-secondary mt-1 text-center' >Go to Home</Link>
                                        <br />
                                        <img src={user.photoURL} alt="" width='60px' />
                                        <p>{user.displayName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
