//import all dependencies and Hooks
import { useEffect, useState }       from "react";
import { useNavigate}                from "react-router-dom";
//import in all bootstrap components
import Card      from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Button    from 'react-bootstrap/Button';
//import in all needed components
    //for the warehouse, since we dont have a picture, we are instead going to put in a map component using its lat long
    //which is sent over instead of the picture data (for now as  a placeholder we send over the pic filename)
//import in all assets
import placeHolder from '../../assets/placeholder-600x400.jpg'
function ShowCard ({ data }){
    //there are 4 general categories, the id, the name, and the pic
    const [imageData, setImageData] = useState(null);
    //first lets go and fetch the pic from the AWS bucket
    const makeAPICall = async () => {
      try {
        const response = await fetch(`http://localhost:3001/images/${data.picture}`, {mode:'cors'});
        setImageData(response.url);
      }
      catch (e) {
        //eventually will have to do something
        //but for now just throw in the placeholder
        console.log(e, 'error')
      }
    }
    useEffect(() => {
      makeAPICall();
    }, []);
    const imagesrc = imageData ? imageData : placeHolder;
    const navigate = useNavigate();
    const handleEditClick = () =>{
      navigate(`/${data.path}/${data.id}/edit`);
    };
    const handleDeleteClick = async () =>{
      const url = (`http://localhost:3001/${data.path}/${data.id}`);
      const response = await fetch(url, {
          'method': 'DELETE'
      });
      if(response.status !== 201){
        //TODO handle this error
        console.log('error')
        const message = await response.json();
    }
    else{
        //handle error here
        const message = await response.json();
        //navigate(`/${data.path}/?deleteSuccess=true`, {replace : true})
    }
    }
    const displayList = Object.keys(data.list).map((item) => {
      return(
        <ListGroup.Item key={item}>
          <Row>
            <Col sm={5}>{item}:</Col>
            <Col sm={7}>{data.list[item]}</Col>
          </Row>
        </ListGroup.Item>
      )});
    return(
        <Card style={{ width: '38rem' }} data-bs-theme="dark" >
        <Card.Img variant="top" src={imagesrc} />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>{data.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
              {displayList}
        </ListGroup>
        <Card.Body>
          <Button variant="primary" onClick={() => handleEditClick()}>Edit This Entry</Button>
          <Button variant="danger" onClick={() => handleDeleteClick()}>Delete this Entry</Button>
        </Card.Body>
      </Card>
    );
};
export default ShowCard;
