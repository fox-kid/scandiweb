import { PureComponent } from "react";
import styles from "./AttributesForm.module.css";

class AttributesForm extends PureComponent {
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
                      this.props.updateSelectedOptions({
                        name: e.target.name,
                        displayValue: e.target.value,
                        type: attr.type,
                        value: option.value,
                      })
                    }
                  />
                  <div
                    className={`${styles.option} ${
                      attr.type === "swatch"
                        ? styles.picked_swatch
                        : styles.picked_text
                    }`}
                    value={option.id}
                    onKeyDown={this.handleKeyDown}
                    role="presentation"
                    style={{
                      backgroundColor:
                        attr.type === "swatch" ? `${option.value}` : "none",
                    }}
                  >
                    {attr.type !== "swatch" && option.value}
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
