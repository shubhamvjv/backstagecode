/* File: skeleton/app/page.tsx */

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1 className={styles.title}>
          Portal App
        </h1>
        <p className={styles.subtitle}>
          Your enterprise-ready Next.js application has been successfully provisioned via Backstage 
          and deployed to Azure App Service.
        </p>
      </div>

      <div className={styles.grid}>
        <a
          href="https://portal.azure.com"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Azure Cloud <span>-&gt;</span>
          </h2>
          <p>
            Hosted on Azure Web Apps (Linux) using Terraform for Infrastructure as Code.
          </p>
        </a>

        <a
          href="https://nextjs.org/docs"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Next.js Stack <span>-&gt;</span>
          </h2>
          <p>
            Built with App Router, React Server Components, and optimized for standalone deployment.
          </p>
        </a>

        <a
          href="https://github.com/features/actions"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            CI/CD Pipeline <span>-&gt;</span>
          </h2>
          <p>
            Automated build and deployment workflows powered by GitHub Actions.
          </p>
        </a>
      </div>
    </main>
  )
}