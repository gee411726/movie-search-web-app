import styles from '../../styles/Home.module.css';
import Dropdown from 'react-dropdown';
//import 'react-dropdown/style.css';

const year = (new Date()).getFullYear();
const options = Array.from(new Array(100), (val, index) => year - index);
const defaultOption = options[0];

export default function YearDropdown(props) {

  return (
    <>
      <h3>Select Year</h3>
      <Dropdown options={options} value={defaultOption} onChange={props.onChange}></Dropdown>
    </>
  )
}

