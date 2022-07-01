import { useState, useEffect } from "react";
import { logOut, db } from "../../firebase/firebaseconfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import "./Home.scss";

const Home = () => {

  const [cars, setCars] = useState([]);
  const carsCol = collection(db, "cars");

  const getCars = async () => {
    await getDocs(carsCol).then((docs:any) => {
      setCars(docs.docs.map((doc: any) => ({...doc.data(), id: doc})));
    });
    };

    const deleteCar = async (id: string) => {
      await deleteDoc(doc(db, "cars", id));
      window.location.reload();
    }

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="main">
      <div className="table">
        <table>
          <thead>
            <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Series</th>
            <th>Vehicle Type</th>
            <th>Color</th>
            <th>Year</th>
            <th>Mile Age</th>
            <th>Doors</th>
            <th>Transmission Style</th>
            <th>Cylinders</th>
            <th>Fuel Type</th>
            <th>Link</th>
            </tr>
          </thead>
          <tbody>
          {cars.map((car: any) => (
            <tr>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.series}</td>
                  <td>{car.type}</td>
                  <td>{car.color}</td>
                  <td>{car.year}</td>
                  <td>{car.mileAge}</td>
                  <td>{car.doors}</td>
                  <td>{car.transmissionStyle}</td>
                  <td>{car.cylinders}</td>
                  <td>{car.fuelType}</td>
                  <button onClick={() => deleteCar(car.id.id)}>Delete</button>
            </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="log-out">
        <button onClick={logOut}/>
      </div>
    </div>
  );
};

export default Home;
