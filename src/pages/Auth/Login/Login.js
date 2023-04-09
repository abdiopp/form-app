import React from 'react'
import { Link } from 'react-router-dom'
export default function Login() {

    // const [isProcessing, setIsProcesssing] = useState(false)

    return (
        <div className='auth' id='login'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="card border-0 shadow p-2 p-md-3 p-lg-4">
                            <div className="row">
                                <div className="col">
                                    <h3 className='mb-4 fw-bold'>Sign In Now</h3>
                                </div>
                            </div>
                            <form>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className='form-control' placeholder='Enter Your Email' name='email' />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className='form-control' placeholder='Enter Your password' name='password' />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <button className='btn btn-warning w-100'>
                                            Sign In

                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col">
                                    <Link to='/auth/register' className='mb-0 text-center' >Need an Account? SignUp</Link>
                                    <br />
                                    <Link to='/' className='mb-0 btn btn-secondary mt-1 text-center' >Go to Home</Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
