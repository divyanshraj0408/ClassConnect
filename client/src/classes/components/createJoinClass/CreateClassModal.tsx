import Modal from "../../../shared/Modals/Modal";
import Button from "../../../shared/button/Button";
import Input from "../../../shared/Input/Input";

import { VALIDATOR_REQUIRE } from "../../../shared/util/Validator";

interface props {
  onClear: any;
  visible: boolean;
}

const CreateClass = (props: props) => {
  return (
    <>
      <Modal
        header="Join a class"
        show={props.visible}
        onCancel={!!props.onClear}
        footer={<Button onClick={props.onClear}>close</Button>}
      >
        <Input
          element="input"
          label="ClassName"
          id="classname"
          onInput={() => {}}
          errorText="enter a classname"
          validators={[VALIDATOR_REQUIRE()]}
        ></Input>
      </Modal>
    </>
  );
};
export default CreateClass;
