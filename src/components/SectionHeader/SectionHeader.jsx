import styles from './SectionHeader.module.css';

export default function SectionHeader({ title, buttonText, onClick }) {
  return (
    <div className={styles.title}>
      <h2>{title}</h2>
      <div className={styles.line}></div>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
}
