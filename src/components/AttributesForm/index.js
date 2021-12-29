import { Component } from "react";
import styles from "./AttributesForm.module.css";

class AttributesForm extends Component {
  render() {
    return (
      <form>
        {this.props.values.map((attr) => (
          <div key={attr.name}>
            <p>{attr.name}:</p>
            <div className={styles.options_wrapper}>
              {attr.items.map((option) => (
                <label key={option.id} htmlFor={option.id}>
                  <input
                    type="radio"
                    name={attr.name}
                    id={option.id}
                    value={option.id}
                    style={{ display: "none" }}
                    onClick={(e) =>
                      this.props.updateSelectedOptions({
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <div
                    className={styles.option}
                    value={option.id}
                    style={{
                      backgroundColor:
                        attr.type === "swatch" ? `${option.value}` : "#fffff",
                    }}
                  >
                    {attr.type !== "swatch" && option.displayValue}
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>
    );
  }
}

export default AttributesForm;
