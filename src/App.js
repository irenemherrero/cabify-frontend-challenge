import React, { Component } from 'react';
import cabifyLogo from './images/cabify-logo.svg';
import './styles/App.css';

const phonePrefixes = [
  {
    country: 'Empty option',
    prefix: '',
  },
  {
    country: 'Spain',
    prefix: '+34',
  },
  {
    country: 'Chile',
    prefix: '+56',
  },
  {
    country: 'Peru',
    prefix: '+51',
  },
  {
    country: 'Mexico',
    prefix: '+521',
  },
  {
    country: 'Colombia',
    prefix: '+57',
  },
  {
    country: 'Bolivia',
    prefix: '+56',
  },
]

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {
              fullname: "Lola Pérez",
              job:"Developer",
              prefix:"+32",
              phoneNumber:"",
              email:"lola_perez@gmail.com",
              website:"lolaperez.com",
              address:"Calle del Olmo, 22",
            },
      selectState: false,
    }
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(){
    this.setState({
      selectState: !this.state.selectState,
    })
  }

  render() {
    const {
      fullname,
      job,
      prefix,
      phoneNumber,
      email,
      website,
      address,
    } = this.state.data;

    return (
      <div className="mainWrapper row">
        <article className="businessCard col col6">
          <figure className="businessCard-badge">
            <a className="businessCard-badge-logo" href="http://www.cabify.com">
              <img src={cabifyLogo} alt="Cabify" />
            </a>
          </figure>
          <h1 className="title-main">Request your business card</h1>
          <div className="businessCard-cards">
            <div className="businessCard-cardBack" />

{/*Tarjeta: aquí hay que meter los datos desde el estado*/}

            <div className="businessCard-cardFront">
              <div>
                <p className="businessCard-cardFront-title">{fullname}</p>
                <p className="businessCard-cardFront-subtitle">{job}</p>
              </div>
              <div className="businessCard-cardFront-bottom">
                <p className="businessCard-icon-phone">{prefix}</p>
                <p className="businessCard-icon-email">{email}</p>
                <p className="businessCard-icon-website">{website}</p>
                <p className="businessCard-icon-address">{address}</p>
              </div>
            </div>
          </div>
        </article>
        <article className="builder col col6">

{/*Coger datos del formulario, poner estilos, etc.*/}

          <form className="form" action="">
            <div className="row">
              <div className="formField-input active col col12">
                <div className="input">
                  <input type="text" name="fullname" value={fullname} onChange="handleInput"/>
                  <label htmlFor="fullname">Full name</label>
                </div>
              </div>
            </div>
{/* you probably need to add active/focus/disabled classNames */}
            <div className="row row-separationMedium">
              <div className="formField-input active focus col col12">
                <div className="input">
                  <input type="text" name="jobdescription" value={job} />
                  <label htmlFor="jobdescription">Job description</label>
                </div>
              </div>
            </div>
{/* select field will be placed here */}
            <div className="row row-separationMedium row-gutterMedium">
              <div className="formField-select active col col3">
                <div className="select">
                  <button id="phone_prefix" className="select-button" type="button" onClick={this.handleSelect}>{prefix}</button>
                  <label htmlFor="phone_prefix">Prefix</label>
                  <div className={`popup dropdown-fade dropdown-back ${this.state.selectState ? 'select-open' : ''}`}>
                    <ul className="select-group-list">
                    {phonePrefixes.map(option => {
                      return(
                        <li className="select-option">
                          {/*} <span className="select-option-flag">Banderita</span>*/}
                          <span className="select-option-country">{option.country}</span>
                          <span className="select-option-prefix">{option.prefix}</span>
                        </li>
                      )
                    })}
                    </ul> 
                    {/*<div className="bottom-fade"></div>*/}  
                  </div>
                </div>
              </div>
{/* select final*/}
              <div className="formField-input col col9">
                <div className="input">
                  <input type="tel" name="ponenumber" value={phoneNumber} />
                  <label htmlFor="ponenumber">Phone number</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className="formField-input col col12">
                <div className="input">
                  <input type="email" name="email" value={email}/>
                  <label htmlFor="email">Email</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className="formField-input active disabled col col12">
                <div className="input">
                  <input type="text" name="website" value={website} />
                  <label htmlFor="website">Website</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className="formField-input active col col12">
                <div className="input">
                  <input type="text" name="address" value={address} />
                  <label htmlFor="address">Address</label>
                </div>
              </div>
            </div>
            <div className="row row-separationHuge">

    {/*Activar el botón cuando todos los datos estén rellenos*/}

              <input className="button button-full button-primary disabled" type="submit" value="Request" />
            </div>
          </form>
        </article>
      </div>
    );
  }
}

export default App;
