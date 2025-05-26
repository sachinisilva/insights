import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";

type AddInsightProps = {
  onClose: Function;
  createInsight: Function;
  open: Boolean;
};
export const AddInsight = (props: AddInsightProps) => {
  const addInsight = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = [...data.entries()];
    const insight = {};
    formData.map((data) => {
      insight[data[0]] = data[1];
    });
    const isCreated = await props.createInsight(insight);
    if (isCreated) props.onClose();
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form id="create" className={styles.form} onSubmit={addInsight}>
        <label className={styles.field}>
          <select name="brand" className={styles["field-input"]}>
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={styles["field-input"]}
            rows={5}
            name="text"
            placeholder="Something insightful..."
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
