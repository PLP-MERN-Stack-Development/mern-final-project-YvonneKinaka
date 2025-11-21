import { useState, useEffect  } from "react";
import "./Model.css";
import Title from '../../Components/Title/Title'
import { Link, useNavigate  } from "react-router-dom";
import menu_icon from '../../assets/menu-icon.png'
import logo from '../../assets/logo.png'

const Model = () => {
  const [formData, setFormData] = useState({
    gender: "Male",
    age: 42,
    smoker: "Yes",
    cigsPerDay: 15,
    bloodPressureMed: "No",
    stroke: "No",
    hypertension: "No",
    diabetes: "No",
    cholLevel: "",
    sysBP: "",
    diaBP: "",
    BMI: "",
    heartRate: "",
    glucose: 100,
  });

  const [result, setResult] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" || type === "range" ? Number(value) : value,
    });
  };
  

  const handleSubmit = async () => {
    const inputData = {
      male: formData.gender === "Male" ? 1 : 0,
      age: Number(formData.age),
      currentSmoker: formData.smoker === "Yes" ? 1 : 0,
      cigsPerDay: Number(formData.cigsPerDay),
      BPMeds: formData.bloodPressureMed === "Yes" ? 1 : 0,
      prevalentStroke: formData.stroke === "Yes" ? 1 : 0,
      prevalentHyp: formData.hypertension === "Yes" ? 1 : 0,
      diabetes: formData.diabetes === "Yes" ? 1 : 0,
      totChol: Number(formData.cholLevel),
      sysBP: Number(formData.sysBP),
      diaBP: Number(formData.diaBP),
      BMI: Number(formData.BMI),
      heartRate: Number(formData.heartRate),
      glucose: Number(formData.glucose),
    };
  

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });
  
      const data = await response.json();
      navigate("/result", { state: { prediction: data.prediction } }); // Navigate after getting response
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  const [mobileMenu, setMobileMenu] = useState(false)
  const toggleMenu = () =>{
        mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
    }
 

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    
  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className="model_container">
      <Title subTitle={"Assess Your Cardiovascular Health in Seconds"} title='Heart Disease Risk Predictor' />
       <nav className={isMobile ? "" : "sidebar"}>
       <img src={logo} alt='' className='logo' /> 
        <ul className={mobileMenu ? '' : 'hide-mobile-menu'} >
          <li><Link className='text' to='/home'>Home</Link></li>
           <li><Link className='text' to='/model' >Predict</Link></li>
           <li><Link className='text' to='/home' >Contact us</Link></li>
        </ul>
      <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu}/>
      </nav>
      <div className="card">
        <div className="card-content">
          <div className="input-group">
            <label>Gender:</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
                Female
              </label>
            </div>
          </div>

          <div className="input-group">
            <label>Age: {formData.age}</label>
            <input type="range" name="age" min={1} max={150} value={formData.age} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Smoker:</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="smoker" value="Yes" checked={formData.smoker === "Yes"} onChange={handleChange} />
                Yes
              </label>
              <label>
                <input type="radio" name="smoker" value="No" checked={formData.smoker === "No"} onChange={handleChange} />
                No
              </label>
            </div>
          </div>

          <div className="input-group">
            <label>Cigarettes per day: {formData.cigsPerDay}</label>
            <input type="range" name="cigsPerDay" min={0} max={50} value={formData.cigsPerDay} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Blood Pressure Medication:</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="bloodPressureMed" value="Yes" checked={formData.bloodPressureMed === "Yes"} onChange={handleChange} />
                Yes
              </label>
              <label>
                <input type="radio" name="bloodPressureMed" value="No" checked={formData.bloodPressureMed === "No"} onChange={handleChange} />
                No
              </label>
            </div>
          </div>

          <div className="input-group">
            <label>Stroke History:</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="stroke" value="Yes" checked={formData.stroke === "Yes"} onChange={handleChange} />
                Yes
              </label>
              <label>
                <input type="radio" name="stroke" value="No" checked={formData.stroke === "No"} onChange={handleChange} />
                No
              </label>
            </div>
          </div>

          <div className="input-group">
            <label>Hypertension:</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="hypertension" value="Yes" checked={formData.hypertension === "Yes"} onChange={handleChange} />
                Yes
              </label>
              <label>
                <input type="radio" name="hypertension" value="No" checked={formData.hypertension === "No"} onChange={handleChange} />
                No
              </label>
            </div>
          </div>

          <div className="input-group">
            <label>Diabetes:</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="diabetes" value="Yes" checked={formData.diabetes === "Yes"} onChange={handleChange} />
                Yes
              </label>
              <label>
                <input type="radio" name="diabetes" value="No" checked={formData.diabetes === "No"} onChange={handleChange} />
                No
              </label>
            </div>
          </div>

          <div className="input-group">
            <label>Cholesterol Level:</label>
            <input type="number" name="cholLevel" value={formData.cholLevel} onChange={handleChange} placeholder="Enter cholesterol level" />
          </div>

          <div className="input-group">
            <label>Systolic Blood Pressure:</label>
            <input type="number" name="sysBP" value={formData.sysBP} onChange={handleChange} placeholder="Enter systolic BP" />
          </div>

          <div className="input-group">
            <label>Diastolic Blood Pressure:</label>
            <input type="number" name="diaBP" value={formData.diaBP} onChange={handleChange} placeholder="Enter diastolic BP" />
          </div>

          <div className="input-group">
            <label>Body Mass Index (BMI):</label>
            <input type="number" name="BMI" value={formData.BMI} onChange={handleChange} placeholder="Enter BMI" />
          </div>

          <div className="input-group">
            <label>Heart Rate:</label>
            <input type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} placeholder="Enter heart rate" />
          </div>

          <div className="input-group">
            <label>Glucose Level: {formData.glucose}</label>
            <input type="range" name="glucose" min={1} max={200} value={formData.glucose} onChange={handleChange} />
          </div>
          <Link to="/result"className="model_button" onClick={handleSubmit}>Predict</Link>
        </div>
      </div>

      {result !== null && (
        <div className={`result ${result === 0 ? "low-risk" : "high-risk"}`}>
          {result === 0 ? "Low risk of cardiovascular disease" : "High risk of cardiovascular disease"}
        </div>
      )}
      {/* <div  className="ft">
        <Footer/>
      </div> */}
    </div>
  );
}
export default Model;
