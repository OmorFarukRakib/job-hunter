// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import SigninBody from "./signinBody/SigninBody";
import clsx from "clsx";
import styles from "./companyDetailsModal.module.css";




function CompanyDetailsModal({ show, onHide, companyDetailsData }) {
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
          
            Company Information
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={clsx(styles["companyProfile-wrapper"])}>
          <div className={clsx(styles["companyProfile-Info"])}>
            <div className={clsx(styles["companyProfile-info-title"])}>
              Company Name
            </div>
            <div className={clsx(styles["companyProfile-info-value"])}>
              {companyDetailsData.companyName}
            </div>
          </div>
          <div className={clsx(styles["companyProfile-Info"])}>
            <div className={clsx(styles["companyProfile-info-title"])}>
              Industry
            </div>
            <div className={clsx(styles["companyProfile-info-value"])}>
              Software Developer Company
            </div>
          </div>
          <div className={clsx(styles["companyProfile-Info"])}>
            <div className={clsx(styles["companyProfile-info-title"])}>
              Company Descriptions
            </div>
            <div className={clsx(styles["companyProfile-info-value"])}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
              delectus corrupti velit itaque repellendus ipsa unde quo odio
              eligendi, fugiat consectetur blanditiis soluta quis hic corporis
              ipsum. Quo quod recusandae libero, error, molestias laudantium
              corrupti, dolorem sint explicabo voluptas eius. Ratione minus
              similique ea hic quasi libero alias impedit vero! Maxime expedita
              voluptate quam libero omnis obcaecati explicabo, accusamus
              asperiores amet pariatur fugiat. Sint incidunt beatae adipisci,
              maxime consectetur praesentium distinctio reiciendis natus quidem
              voluptatem officiis veniam iste iusto sunt in, similique vel nobis
              animi laudantium error. Consequatur quibusdam blanditiis autem
              est, ipsa ducimus iusto vel nemo nesciunt rerum molestias corrupti
              animi rationeLorem ipsum dolor, sit amet consectetur adipisicing
              elit. Amet delectus corrupti velit itaque repellendus ipsa unde
              quo odio eligendi, fugiat consectetur blanditiis soluta quis hic
              corporis ipsum. Quo quod recusandae libero, error, molestias
              laudantium corrupti, dolorem sint explicabo voluptas eius. Ratione
              minus similique ea hic quasi libero alias impedit vero! Maxime
              expedita voluptate quam libero omnis obcaecati explicabo,
              accusamus asperiores amet pariatur fugiat. Sint incidunt beatae
              adipisci, maxime consectetur praesentium distinctio reiciendis
              natus quidem voluptatem officiis veniam iste iusto sunt in,
              similique vel nobis animi laudantium error. Consequatur quibusdam
              blanditiis autem est, ipsa ducimus iusto vel nemo nesciunt rerum
              molestias corrupti animi rationeLorem ipsum dolor, sit amet
              consectetur adipisicing elit. Amet delectus corrupti velit itaque
              repellendus ipsa unde quo odio eligendi, fugiat consectetur
              blanditiis soluta quis hic corporis ipsum. Quo quod recusandae
              libero, error, molestias laudantium corrupti, dolorem sint
              explicabo voluptas eius. Ratione minus similique ea hic quasi
              libero alias impedit vero! Maxime expedita voluptate quam libero
              omnis obcaecati explicabo, accusamus asperiores amet pariatur
              fugiat. Sint incidunt beatae adipisci, maxime consectetur
              praesentium distinctio reiciendis natus quidem voluptatem officiis
              veniam iste iusto sunt in, similique vel nobis animi laudantium
              error. Consequatur quibusdam blanditiis autem est, ipsa ducimus
              iusto vel nemo nesciunt rerum molestias corrupti animi
              rationeLorem ipsum dolor, sit amet consectetur adipisicing elit.
              Amet delectus corrupti velit itaque repellendus ipsa unde quo odio
              eligendi, fugiat consectetur blanditiis soluta quis hic corporis
              ipsum. Quo quod recusandae libero, error, molestias laudantium
              corrupti, dolorem sint explicabo voluptas eius. Ratione minus
              similique ea hic quasi libero alias impedit vero! Maxime expedita
              voluptate quam libero omnis obcaecati explicabo, accusamus
              asperiores amet pariatur fugiat. Sint incidunt beatae adipisci,
              maxime consectetur praesentium distinctio reiciendis natus quidem
              voluptatem officiis veniam iste iusto sunt in, similique vel nobis
              animi laudantium error. Consequatur quibusdam blanditiis autem
              est, ipsa ducimus iusto vel nemo nesciunt rerum molestias corrupti
              animi ratione
            </div>
          </div>
          <div className={clsx(styles["companyProfile-Info"])}>
            <div className={clsx(styles["companyProfile-info-title"])}>
              Company Size
            </div>
            <div className={clsx(styles["companyProfile-info-value"])}>
              Medium
            </div>
          </div>
          <div className={clsx(styles["companyProfile-Info"])}>
            <div className={clsx(styles["companyProfile-info-title"])}>
              Company Address
            </div>
            <div className={clsx(styles["companyProfile-info-value"])}>
              221B Baker Street, London
            </div>
          </div>
          <div className={clsx(styles["companyProfile-Info"])}>
            <div className={clsx(styles["companyProfile-info-title"])}>
              Company Website
            </div>
            <div className={clsx(styles["companyProfile-info-value"])}>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                company.com
              </a>
            </div>
          </div>
          <div className={clsx(styles["companyProfile-Info"])}>
            <div className={clsx(styles["companyProfile-info-title"])}>
              Contact Person Name
            </div>
            <div className={clsx(styles["companyProfile-info-value"])}>
              Mr. Brayan
            </div>
          </div>
          <div className={clsx(styles["companyProfile-Info"])}>
            <div className={clsx(styles["companyProfile-info-title"])}>
              Contact Email
            </div>
            <div className={clsx(styles["companyProfile-info-value"])}>
              ABCompany@gmail.com
            </div>
          </div>
          <div className={clsx(styles["companyProfile-Info"])}>
            <div className={clsx(styles["companyProfile-info-title"])}>
              Contact Phone
            </div>
            <div className={clsx(styles["companyProfile-info-value"])}>
              +880155555555
            </div>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default CompanyDetailsModal;
