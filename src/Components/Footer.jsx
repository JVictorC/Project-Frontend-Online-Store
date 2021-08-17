import React, { Component } from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { BiRocket } from 'react-icons/bi';
import dataDevelopers from './Data/Developers';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { devSelect: false };
    this.hadlerClick = this.hadlerClick.bind(this);
  }

  hadlerClick({ target }) {
    const classesSelect = document.querySelector('.select');
    if (classesSelect) { classesSelect.classList.remove('select'); }
    target.classList.add('select');
    this.setState({ devSelect: dataDevelopers[target.innerText] });
  }

  render() {
    const { devSelect } = this.state;
    let componente = (
      <div>
        <h2 className="text-success m-5 display-6">
          <BiRocket className="m-2" />
          #VQV
          <BiRocket className="m-2" />
        </h2>
      </div>
    );
    if (devSelect) {
      componente = (
        <div className="dados-dev">
          <h2 className="display-6 m-5">
            <BiRocket className="m-2 text-success" />
            {devSelect.name}
            <BiRocket className="m-2 text-success" />
          </h2>
          <nav>
            <a href={ devSelect.gitHub } target="_blank" rel="noopener noreferrer">
              <AiFillGithub className="fs-1 text-success m-5 text-center" />
            </a>
            <a href={ devSelect.linkedin } target="_blank" rel="noopener noreferrer">
              <AiFillLinkedin className="fs-1 text-success m-5 text-center" />
            </a>
          </nav>
        </div>
      );
    }
    return (
      <footer>
        <h2 className="text-success p-2">Developers</h2>
        <nav>
          <button
            type="button"
            onClick={ this.hadlerClick }
            className="lead links"
          >
            Gabriel Suassuna

          </button>
          <button
            type="button"
            onClick={ this.hadlerClick }
            className="lead links"
          >
            Genivaldo Cicero

          </button>
          <button
            type="button"
            onClick={ this.hadlerClick }
            className="lead links"
          >
            Jacson Rodrigues

          </button>
          <button
            type="button"
            onClick={ this.hadlerClick }
            className="lead links"
          >
            João Victor
          </button>
          <button
            type="button"
            onClick={ this.hadlerClick }
            className="lead links"
          >
            Matheus Pormanhani

          </button>
        </nav>
        {
          componente
        }
      </footer>
    );
  }
}

export default Footer;
