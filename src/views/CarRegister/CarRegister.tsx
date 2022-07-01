import "./CarRegister.scss";
import { useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase/firebaseconfig';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CarRegister = () => {
  const [vinNumber, setVinNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [series, setSeries] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState(0);
  const [mileAge, setMileAge] = useState(0);
  const [doors, setDoors] = useState(0);
  const [transmissionStyle, setTransmissionStyle] = useState("");
  const [cylinders, setCylinders] = useState(0);
  const [fuelType, setFuelType] = useState("");

  const [userID, setUserID] = useState("");

  const navigate = useNavigate();
  const nhtsa = require("nhtsa");

  (async () => {
    const { data } = await nhtsa.decodeVin(vinNumber);

    onAuthStateChanged(auth, (user) => {
      if(user != null) {
      setUserID(user.uid)
      }
   })

    setBrand(data.Results[6].Value);
    setModel(data.Results[8].Value);
    setSeries(data.Results[11].Value);
    setType(data.Results[13].Value);
    setYear(data.Results[9].Value);
    setDoors(data.Results[23].Value);
    setTransmissionStyle(data.Results[48].Value);
    setCylinders(data.Results[69].Value);
    setFuelType(data.Results[76].Value);
  })();

  const addDocu = async (e:any) => {
    e.preventDefault();

    const payload = {
      brand: brand,
      model: model,
      series: series,
      type: type,
      year: year,
      doors: doors,
      transmissionStyle: transmissionStyle,
      cylinders: cylinders,
      fuelType: fuelType,
      user_id: userID,
      timeAdded: serverTimestamp()
    }

    await setDoc(doc(db, 'cars', vinNumber), payload);
  };

  return (
    <div role="main" className="form-all">
      <form onSubmit={(e) => addDocu(e)}>
        <ul className="form-section page-section">
          <li
            className="form-line jf-required"
            data-type="control_textbox"
            id="id_20"
          >
            <label
              className="form-label form-label-right form-label-auto"
              id="label_20"
            >
              Chassis Number / VIN number Please enter the full 17 digits
              <span className="form-required">*</span>
            </label>
            <div id="cid_20" className="form-input jf-required">
              <input
                onChange={(e) => setVinNumber(e.target.value)}
                type="text"
                id="input_20"
                name="q20_chassisNumber"
                data-type="input-textbox"
                className="form-textbox validate[required]"
                data-defaultvalue=""
                value={vinNumber}
                placeholder=" "
                data-component="textbox"
                aria-labelledby="label_20"
              />
            </div>
          </li>
          <li
            className="form-line jf-required"
            data-type="control_textbox"
            id="id_21"
          >
            <label
              className="form-label form-label-right form-label-auto"
              id="label_21"
            >
              Vehicle Brand
              <span className="form-required">*</span>
            </label>
            <div id="cid_21" className="form-input jf-required">
              <input
                onChange={(e) => setBrand(e.target.value)}
                type="text"
                id="input_21"
                name="q21_vehicleBrand"
                data-type="input-textbox"
                className="form-textbox validate[required]"
                data-defaultvalue=""
                value={brand}
                placeholder=" "
                data-component="textbox"
                aria-labelledby="label_21"
              />
            </div>
          </li>
          <li
            className="form-line jf-required"
            data-type="control_textbox"
            id="id_22"
          >
            <label
              className="form-label form-label-right form-label-auto"
              id="label_22"
            >
              Model
              <span className="form-required">*</span>
            </label>
            <div id="cid_22" className="form-input jf-required">
              <input
                onChange={(e) => setModel(e.target.value)}
                type="text"
                id="input_22"
                name="q22_model"
                data-type="input-textbox"
                className="form-textbox validate[required]"
                data-defaultvalue=""
                value={model}
                placeholder=" "
                data-component="textbox"
                aria-labelledby="label_22"
              />
            </div>
          </li>
          <li
            className="form-line"
            data-type="control_textbox"
            id="id_34"
          >
            <label
              className="form-label form-label-right form-label-auto"
              id="label_34"
            >
              {" "}
              Series{" "}
            </label>
            <div id="cid_34" className="form-input">
              <input
                onChange={(e) => setSeries(e.target.value)}
                type="text"
                id="input_34"
                name="q34_series"
                data-type="input-textbox"
                className="form-textbox validate[Numeric]"
                data-defaultvalue=""
                value={series}
                placeholder=" "
                data-component="textbox"
                aria-labelledby="label_34"
              />
            </div>
          </li>
          <li
            className="form-line jf-required"
            data-type="control_textbox"
            id="id_35"
          >
            <label
              className="form-label form-label-right form-label-auto"
              id="label_35"
            >
              Vehicle Type
              <span className="form-required">*</span>
            </label>
            <div id="cid_35" className="form-input jf-required">
              <input
                onChange={(e) => setType(e.target.value)}
                type="text"
                id="input_35"
                name="q35_series35"
                data-type="input-textbox"
                className="form-textbox validate[required, Numeric]"
                data-defaultvalue=""
                value={type}
                placeholder=" "
                data-component="textbox"
                aria-labelledby="label_35"
              />
            </div>
          </li>
          <li
            className="form-line jf-required"
            data-type="control_textbox"
            id="id_23"
          >
            <label
              className="form-label form-label-right form-label-auto"
              id="label_23"
            >
              Colour
              <span className="form-required">*</span>
            </label>
            <div id="cid_23" className="form-input jf-required">
              <input
                onChange={(e) => setColor(e.target.value)}
                type="text"
                id="input_23"
                name="q23_colour"
                data-type="input-textbox"
                className="form-textbox validate[required]"
                data-defaultvalue=""
                value={color}
                placeholder=" "
                data-component="textbox"
                aria-labelledby="label_23"
              />
            </div>
          </li>
          <li
            className="form-line jf-required"
            data-type="control_textbox"
            id="id_24"
          >
            <label
              className="form-label form-label-right form-label-auto"
              id="label_24"
            >
              Year
              <span className="form-required">*</span>
            </label>
            <div id="cid_24" className="form-input jf-required">
              <input
                onChange={(e:any) => setYear(e.target.value)}
                type="text"
                id="input_24"
                name="q24_year"
                data-type="input-textbox"
                className="form-textbox validate[required, Numeric]"
                data-defaultvalue=""
                value={year}
                placeholder=" "
                data-component="textbox"
                aria-labelledby="label_24"
              />
            </div>
          </li>
          <li
            className="form-line jf-required"
            data-type="control_textbox"
            id="id_25"
          >
            <label
              className="form-label form-label-right form-label-auto"
              id="label_25"
            >
              Current Mileage
              <span className="form-required">*</span>
            </label>
            <div id="cid_25" className="form-input jf-required">
              <input
                onChange={(e:any) => setMileAge(e.target.value)}
                type="number"
                id="input_25"
                name="q25_currentMileage"
                data-type="input-textbox"
                className="form-textbox validate[required, Numeric]"
                data-defaultvalue=""
                value={mileAge}
                placeholder=" "
                data-component="textbox"
                aria-labelledby="label_25"
              />
            </div>
          </li>
          <li
            className="form-line jf-required"
            data-type="control_textbox"
            id="id_33"
          >
            <label
              className="form-label form-label-right form-label-auto"
              id="label_33"
            >
              Doors
              <span className="form-required">*</span>
            </label>
            <div id="cid_33" className="form-input jf-required">
              <input
                onChange={(e:any) => setDoors(e.target.value)}
                type="number"
                id="input_33"
                name="q33_doors"
                data-type="input-textbox"
                className="form-textbox validate[required, Numeric]"
                data-defaultvalue=""
                value={doors}
                placeholder=" "
                data-component="textbox"
                aria-labelledby="label_33"
              />
            </div>
          </li>
          <li
            className="form-line jf-required"
            data-type="control_textbox"
            id="id_36"
          >
            <label
              className="form-label form-label-right form-label-auto"
              id="label_36"
            >
              Transmission Style
              <span className="form-required">*</span>
            </label>
            <div id="cid_36" className="form-input jf-required">
              <input
                onChange={(e) => setTransmissionStyle(e.target.value)}
                type="text"
                id="input_36"
                name="q36_transmissionStyle"
                data-type="input-textbox"
                className="form-textbox validate[required, Alphabetic]"
                data-defaultvalue=""
                value={transmissionStyle}
                placeholder=" "
                data-component="textbox"
                aria-labelledby="label_36"
              />
            </div>
          </li>
          <li
            className="form-line jf-required"
            data-type="control_textbox"
            id="id_37"
          >
            <label
              className="form-label form-label-right form-label-auto"
              id="label_37"
            >
              Number of Cylinders
              <span className="form-required">*</span>
            </label>
            <div id="cid_37" className="form-input jf-required">
              <input
                onChange={(e:any) => setCylinders(e.target.value)}
                type="text"
                id="input_37"
                name="q37_numberOf"
                data-type="input-textbox"
                className="form-textbox validate[required, Numeric]"
                data-defaultvalue=""
                value={cylinders}
                placeholder=" "
                data-component="textbox"
                aria-labelledby="label_37"
              />
            </div>
          </li>
          <li
            className="form-line jf-required"
            data-type="control_textbox"
            id="id_38"
          >
            <label
              className="form-label form-label-right form-label-auto"
              id="label_38"
            >
              Fuel Type
              <span className="form-required">*</span>
            </label>
            <div id="cid_38" className="form-input jf-required">
              <input
                onChange={(e) => setFuelType(e.target.value)}
                type="text"
                id="input_38"
                name="q38_fuelType"
                data-type="input-textbox"
                className="form-textbox validate[required, Alphabetic]"
                data-defaultvalue=""
                value={fuelType}
                placeholder=" "
                data-component="textbox"
                aria-labelledby="label_38"
              />
            </div>
          </li>
          <li className="form-line" data-type="control_button" id="id_32">
            <div id="cid_32" className="form-input-wide">
              <div
                data-align="center"
                className="form-buttons-wrapper form-buttons-center   jsTest-button-wrapperField"
              >
                <button
                  id="input_32"
                  type="submit"
                  className="form-submit-button submit-button jf-form-buttons jsTest-submitField"
                  data-component="button"
                  data-content=""
                  onClick={(e) => navigate("/carconfirmed")}
                >
                  Submit
                </button>
                <span>&nbsp;</span>
              </div>
            </div>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default CarRegister;
