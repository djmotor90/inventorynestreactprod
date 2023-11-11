//import all dependencies and Hooks
import { tab } from "@testing-library/user-event/dist/tab";
import { useEffect, useState } from "react";
//import in all bootstrap components
import Table from 'react-bootstrap/Table';
import { Link }                from "react-router-dom";



function GeneralTable ({ data }){
    //seperate out your params
    const [ foundPlaces, id, linkPath ] = data;
    //first make the header
    //note: figure out sorting, right now it only does ascending descending
    let tableHeadStates = {};
    //note: will have to add in arrows
    // assuming there is at least one entry this will work, should write something that will replace it with a placeholder if not
    const tableHeader = Object.keys(foundPlaces[0]).map(key => {
        if (key !== id)
        {
            return(
                <th key={key}>
                    <Link style={{ textDecoration:'none'}} to={`${linkPath}/?column=${key}&order=ASC`} >{key}</Link> 
                </th>
            );
        }
    });
    const tableIndRow = (row) => {
        //delete the primary id 
        delete row[id];
        return(
            Object.keys(row).map(key => {
                    return(
                        <td> 
                            {row[key]} 
                        </td>
                    )
            })
        );
    };
    console.log(foundPlaces)
    const tableData = foundPlaces.map(row => {
        return(
            <tr key={row[id]} onClick={''}>
                {tableIndRow(row)}
            </tr>
        )
    });
    //Rhionna is working from her branch here:
    //TODO: add pagination
    //TODO: add a link to each row
    //TODO: add searching functionality via a form
    //TODO: add 
    return(
            <Table responsive striped="columns" data-bs-theme="dark">
                <thead>
                    <tr>
                        {tableHeader}
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </Table>
    );
};
export default GeneralTable;
