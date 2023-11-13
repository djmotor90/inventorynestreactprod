//Import all bootstrap components
import Toast    from 'react-bootstrap/Toast';
import NotifToast from "../NotifToast";

function NotifToast ( { message}){
    //On success of an add, you will be redirected here and create a success toast notification
    const [searchParams, setSearchParams] = useSearchParams();
    const [show, setShow] = useState(false);
    let successText = ''
    const handleAddSuccess = () => {
       if (searchParams.get('success')){
          setShow(true);
       }
    };
    <Toast onClose={() => setShow(false)} data-bs-theme="dark" show={show} delay={3000} autohide style = {{position:'absolute', right: '0'}}>
    <Toast.Header>
      <img
        src="holder.js/20x20?text=%20"
        className="rounded me-2"
        alt=""
      />
      <strong className="me-auto">Inventory Nest</strong>
      <small>Just Now</small>
    </Toast.Header>
    <Toast.Body> You have successfully added a new Product to the Database.</Toast.Body>
  </Toast>
}
export default NotifToast;