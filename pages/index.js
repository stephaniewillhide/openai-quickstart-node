import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [planInput, setPlanInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan: planInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setPlanInput("");
  }

  return (
    <div>
      <Head>
        <title>Cheerful Invite Generator</title>
        <link rel="icon" href="/wave.png" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
      </Head>

      <main className={styles.main}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 text-center">
              <h1 className="pt-3 pt-md-5">Friendly Invite Generator</h1>
              <img src="/wave.png" height="114" width="114" alt="hand waving icon" className="w-25 p-3" />
              <p>Enter your friend's name, an idea for a plan, and the day, and we'll craft a cheerful message to send to them.</p>
              <form onSubmit={onSubmit}>
                <input
                  className="form-control"
                  type="text"
                  name="plan"
                  placeholder="Ex: Sam, coffee, Thursday"
                  value={planInput}
                  onChange={(e) => setPlanInput(e.target.value)}
                />
                <input type="submit" className="btn btn-info m-3" value="Generate plan" />
              </form>
              <div className="alert alert-primary">{result}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
