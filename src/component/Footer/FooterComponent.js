import React, { PureComponent } from "react";
import {
  Navbar,
  Container
} from "react-bootstrap";

export default class Footer extends PureComponent {
  render() {
    return (
      <>
        <footer className="Footer">
          <Container>
            <Navbar.Brand>
              <li className="list-unstyled text-center">
                Atbalsta centrs: e-pasts: kautkas@gmail.com, tālr.: +371 12345678
              </li>
              <li className="list-unstyled text-center">
                &copy; Atvērts blogs 2022
              </li>
            </Navbar.Brand>
          </Container>
        </footer>
      </>
    );
  }
}
