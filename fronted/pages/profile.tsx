import Link from 'next/link';
import { useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

const Profile: NextPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [twitter, setTwitter] = useState('');
  const [telegram, setTelegram] = useState('');
  const [ens, setEns] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos al servidor
    console.log(name, description, twitter, telegram, ens);
  };

  return (
    <div className={`${styles.container} ${styles.whiteBackground}`}>
      <nav className={`${styles.sidebar} ${styles.whiteBackground}`}>
        <h2 className={styles.blackText}>Menu</h2>
        <ul className={`${styles.menuList} ${styles.blackText}`}>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/new-project">New Project</Link>
          </li>
        </ul>
      </nav>

      <main className={`${styles.content} ${styles.whiteBackground}`}>
        <h2 className={styles.blackText}>Complete your profile</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className={styles.blackText}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.formInput}
          />

          <label htmlFor="description" className={styles.blackText}>Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.formTextArea}
          ></textarea>

          <label htmlFor="twitter" className={styles.blackText}>Twitter</label>
          <input
            type="text"
            id="twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            className={styles.formInput}
          />

          <label htmlFor="telegram" className={styles.blackText}>Telegram</label>
          <input
            type="text"
            id="telegram"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            className={styles.formInput}
          />

          <label htmlFor="ens" className={styles.blackText}>ENS</label>
          <input
            type="text"
            id="ens"
            value={ens}
            onChange={(e) => setEns(e.target.value)}
            className={styles.formInput}
          />

          <button type="submit" className={`${styles.formButton} ${styles.blackText}`}>Submit</button>
        </form>
      </main>
    </div>
  );
};

export default Profile;
