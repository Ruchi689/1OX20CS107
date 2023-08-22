import React , { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';


function SingleTrain() {
  const [train, setTrain] = useState([]);
  const [token, setToken] = useState("");

  const myTokenfunc = async () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                "companyName": "Train Central",
                "clientID": "5b3487a9-632d-4292-85cc-de34d44f8275",
                "ownerName": "Ram",
                "ownerEmail": "ram@abc.edu",
                "rollno": "3",
                "clientSecret": "ZPBVcodWJbYmpBEp"
            }
        )
    };
    
    await fetch('http://20.244.56.144/train/auth', requestOptions).then((data) => {
        console.log("abcdabcd", data);
        data.json().then(result => {
            console.log("result", result.access_token);
            setToken(result.access_token);
        }
        )
    })

}

const myToken = token;
//   const myToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI2OTI5MTIsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiNWIzNDg3YTktNjMyZC00MjkyLTg1Y2MtZGUzNGQ0NGY4Mjc1Iiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjMifQ.UAQtqBtIHXg2vlJgZhGIsTrOjrGfrK1PsHvdL4fvPGk";
        
      useEffect(() => {
        const headers = { 'Authorization': `Bearer ${myToken}` }
        fetch('http://20.244.56.144/train/trains/2344', {headers}).then((data) => {
            console.log("data", data);
            // console.log("2nd call token", myToken);

            data.json().then(result => {
                console.log(result);
                console.log(result.trainName);
                setTrain(result);
            })
        })
    }, [])

    // const traindetails =() => {
    //   navigate
    // }

  return (
    <div>
         <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Train Number</th>
                        <th>Train Name</th>
                        <th>Departure Time</th>
                        <th>Sleeper Seats</th>
                        <th>Sleeper Price</th>
                        <th>AC Seats</th>
                        <th>AC Price</th>
                        <th>Delayed by</th>
                    </tr>
                </thead>
                {
                    Object.entries(train).map(([item, index]) =>
                        <tr key={index}>
                            <td>{item}</td>
                            <td>{train.trainNumber}</td>
                            <td >{train.trainName}</td>
                            <td>{train.departureTime.Hours}:{train.departureTime.Minutes}</td>
                            <td>{train.seatsAvailable.sleeper}</td>
                            <td>{train.price.sleeper}</td>
                            <td>{train.seatsAvailable.AC}</td>
                            <td>{train.price.AC}</td>
                            <td>{train.delayedBy}</td>

                        </tr>
                    )
                }
                <tbody>

                </tbody>
            </Table>
    </div>
  )
}

export default SingleTrain
