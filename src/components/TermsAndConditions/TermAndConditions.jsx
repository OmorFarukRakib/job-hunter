// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import SigninBody from "./signinBody/SigninBody";
import clsx from "clsx";
import styles from "./termAndConditions.module.css";
import { Button } from "@mui/material";



function TermAndConditions({ show, onHide, userData }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      // className={clsx(styles["singinBody-wrapper"])}
      //   size="sm"
      //   dialogClassName="modal-90w"
      dialogClassName="custom-modal-for-companyDetails"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
    >
      <Modal.Header className="px-4" closeButton>
        <Modal.Title
          className="ms-auto"
          id="contained-modal-title-vcenter"
          centered
        >
          Terms and Conditions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={clsx(styles["userProfile-wrapper"])}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptate voluptatem perspiciatis temporibus pariatur voluptatibus, optio voluptatum illo quis officia sit odit quod asperiores at consectetur placeat ad perferendis similique impedit cumque magnam quos dolorum. Nemo omnis nihil laudantium minus eaque consequuntur voluptate culpa aperiam voluptatibus? Dolorum incidunt repellat id officiis expedita, porro explicabo neque omnis, delectus accusamus dolores consequuntur animi iste rerum placeat ipsa quis nemo amet recusandae aliquid quod et ea accusantium sed. Cumque nemo consectetur obcaecati ea! Expedita, eius saepe excepturi maxime minima alias minus numquam enim explicabo. Eligendi laboriosam quas inventore labore voluptatibus, repellat ad fuga delectus, deserunt aut eos maiores assumenda sapiente aperiam officia doloribus non dolor voluptate. Voluptas nulla fugiat consectetur labore aperiam eum cum dicta officiis? Quod quas veritatis minima eos molestiae eveniet eligendi asperiores, possimus sequi exercitationem pariatur omnis, cumque soluta quo. Asperiores quasi, accusantium fugiat iure fuga, iusto nostrum maiores quibusdam eaque facere quidem soluta nulla possimus assumenda, qui quam amet alias ullam neque aperiam. Atque nam praesentium quaerat molestiae magni eligendi, minima odit, sed eius facere totam similique consequuntur repellendus voluptas consequatur repellat repudiandae ducimus velit beatae ad. Quidem provident earum obcaecati et tempore molestias dolorum exercitationem corrupti, consectetur, quae quibusdam eos voluptates ut doloremque velit enim impedit! Omnis eos necessitatibus nesciunt et ratione id enim quia ex reprehenderit quod cum laudantium, deserunt suscipit, consequuntur animi consectetur dolores doloribus nisi harum molestias aliquam praesentium aspernatur. Laborum unde reprehenderit recusandae dicta ex rem explicabo sequi quam corrupti vero, culpa inventore voluptatibus quibusdam magni. Earum deserunt quos et! Dolor voluptatum culpa expedita molestias nemo atque provident vero aliquid id odio ea architecto, exercitationem quidem quis a quos eius velit illo voluptates. Quis voluptate delectus, debitis placeat dolore doloribus dolor sed facilis! Dolore architecto voluptatum asperiores officiis aperiam adipisci, facilis veniam. Autem ratione est beatae architecto labore enim assumenda. Quis corporis adipisci unde! Esse, consectetur soluta iste velit eaque ducimus a consequuntur deserunt earum repellat fuga assumenda illo excepturi aliquam facere natus, mollitia atque! Soluta unde, ea sapiente veniam eaque exercitationem in laborum cum dolorum, tempore sequi vero. Dignissimos doloremque ipsa iusto, doloribus natus at praesentium numquam expedita, veniam et, sapiente illum! Expedita beatae veritatis provident aspernatur aperiam, facere iusto alias ipsa, at qui delectus. Fugit enim molestiae cupiditate velit tenetur tempore. Sapiente soluta atque commodi laudantium at quibusdam nisi mollitia alias quasi neque, illo praesentium error provident quaerat facere voluptate sequi laborum recusandae autem nulla ab cum dolores deleniti nesciunt! Blanditiis nam repellat ipsa, dicta accusamus libero est dolore consectetur ea sunt, praesentium voluptatibus reiciendis. Quidem pariatur laboriosam aspernatur mollitia incidunt corrupti eaque fugiat neque, at est accusamus natus placeat quis suscipit sunt ab! Fuga officia cum nemo nostrum nesciunt, non, harum, quo repellendus reiciendis consectetur reprehenderit alias quasi nihil quaerat magnam quibusdam recusandae rerum debitis nisi soluta! Quaerat fugit accusamus deserunt, eveniet explicabo porro in quod. Neque sapiente harum aliquid assumenda praesentium est, molestiae, qui iure, perspiciatis mollitia hic natus ea. Inventore eum repellat consequuntur doloremque obcaecati sit temporibus nostrum vero!
        </div>
      </Modal.Body>
      <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" size="large" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TermAndConditions;
