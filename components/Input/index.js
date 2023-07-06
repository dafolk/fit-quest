import styles from "./Input.module.css";

const Input = ({ onChangeHandler, value }) => {
  return (
    <input value={value} onChange={onChangeHandler} className={styles.input} />
  );
};

export default Input;
