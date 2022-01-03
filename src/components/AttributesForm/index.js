import { Component } from "react";
import styles from "./AttributesForm.module.css";

class AttributesForm extends Component {
  render() {
    return (
      <form>
        {this.props.values.map((attr) => (
          <div key={attr.name}>
            <p className={styles.attribute_name}>{attr.name}:</p>
            <div className={styles.options_wrapper}>
              {attr.items.map((option) => (
                <label
                  key={option.id}
                  htmlFor={(attr.name + option.id) // Because it would find attribute with option ID yes/no and had a bug
                    .split(" ")
                    .join("_")
                    .toLowerCase()}
                  className={styles.option_box}
                >
                  <input
                    type="radio"
                    name={attr.name}
                    id={(attr.name + option.id)
                      .split(" ")
                      .join("_")
                      .toLowerCase()}
                    value={option.id}
                    style={{ display: "none" }}
                    onClick={(e) =>
                      this.props.updateSelectedOptions(
                        e.target.name,
                        e.target.value,
                        attr.type,
                        option.value
                      )
                    }
                  />
                  <div
                    className={styles.option}
                    value={option.id}
                    style={{
                      backgroundColor:
                        attr.type === "swatch" ? `${option.value}` : "none",
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
