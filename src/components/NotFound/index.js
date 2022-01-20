import { PureComponent } from "react";
import styles from "./NotFound.module.css";

class NotFound extends PureComponent {
  render() {
    return (
      <section className={styles.container}>
        <div>Page not found. Maybe choose a category?</div>
      </section>
    );
  }
}

export default NotFound;
