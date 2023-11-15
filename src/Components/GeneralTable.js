//import all dependencies and Hooks
import { useNavigate, Link }  from "react-router-dom";
//import in all bootstrap components
import Table         from 'react-bootstrap/Table';


function GeneralTable ({ data }){
    //seperate out your params
    const [ foundPlaces, id, linkPath ] = data;
    //State variables and handlers
    //handle row click 
    const navigate = useNavigate();
    const handleRowClick = (id) => {
        if (linkPath !== null){
            navigate(`/${linkPath}/${id}`);  
        } 
    };
    //first make the header
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
        //loop through the row object and remove every primaryID key from displaying on the table
        return(
            Object.keys(row).map(key => {
                //if the datatype this is getting is an array, i want a list for this td
                console.log(typeof(row[key]));
                if (typeof(row[key]) === 'object'){
                    const makeAList = Object.keys(row[key]).map((index) => {
                        return (<li key={index}> {row[key][index]} </li>)
                    });
                    return(<td key={key}><ul>{makeAList}</ul> </td>)
                }else{
                    if (key !== id){return(<td key={key}> {row[key]} </td>)}
                }
            })
        );
    };
    const tableData = foundPlaces.map(row => {
        return(
            <tr key={row[id]} id={row[id]} onClick={() => handleRowClick(row[id])}>
                {tableIndRow(row)}
            </tr>
        )
    });
    //TODO: add pagination
    //TODO: add a link to each row
    //TODO: add searching functionality via a form
    //TODO: add 
    return(
            <Table responsive striped bordered hover data-bs-theme="dark">
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
