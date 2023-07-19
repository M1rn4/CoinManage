import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

const Newproject: NextPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [twitter, setTwitter] = useState('');
  const [telegram, setTelegram] = useState('');
  const [ens, setEns] = useState('');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos al servidor
    console.log(name, description, twitter, telegram, ens);

    // Redirigir a otra ruta
    router.push('/kanboard');
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
        <h2 className={styles.blackText}>Complete your project</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className={styles.blackText}>Tell more about your project and be specific</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.formInput}
          />

          <label htmlFor="description" className={styles.blackText}>Who is the address of your freelancer?</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.formTextArea}
          ></textarea>

          <button type="submit" className={`${styles.formButton} ${styles.blackText}`}>Create</button>
        </form>
      </main>
    </div>
  );
};

export default Newproject;
