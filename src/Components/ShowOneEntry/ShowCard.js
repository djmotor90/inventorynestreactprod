//import all dependencies and Hooks
import { useNavigate}  from "react-router-dom";
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
    const navigate = useNavigate();
    const handleEditClick = () =>{
      navigate(`/${data.path}/${data.id}/edit`);
    };
    const handleDeleteClick = async () =>{
      const url = (`http://localhost:3001/${data.path}/${data.id}`);
      await fetch(url, {
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
        <Card.Img variant="top" src={placeHolder} />
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
