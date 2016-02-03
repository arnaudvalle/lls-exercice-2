import React from 'react';
import ReactDOM from 'react-dom';
import TableEleves from './TableEleves';
import PanelDetails from './PanelDetails';
import $ from 'jquery';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            eleves: [],
            selected: ''
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    componentDidMount() {
        this.serverRequest = $.ajax({
            cache: false,
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            type: 'GET',
            url: '/app/data/eleves.json'
        }).done(function(data) {
            this.setState({
                eleves: data.eleves
            });
        }.bind(this)).fail(function(xhr, status, err) {
            console.error('Erreur en récupérant les élèves', status, err.toString());
        });
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        return (
            <div>
                <div className="heading-main">
                    <div className="container">
                        <h1 className="heading-main__text">Classe &#8220;Westeros&#8221;</h1>
                    </div>
                </div>
                <div className="container">
                    <button
                        type="button"
                        className="btn btn--primary btn--lg btn--effect"
                        onClick={this.handleAddClick}>Ajouter</button>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-6">
                            <TableEleves
                                eleves={this.state.eleves}
                                handleEditClick={this.handleEditClick}
                                handleDeleteClick={this.handleDeleteClick} />
                        </div>
                        <div className="col-sm-6">
                            <PanelDetails
                                selected={this.state.selected}
                                handleFieldChange={this.handleFieldChange}
                                handleSaveClick={this.handleSaveClick}
                                handleCancelClick={this.handleCancelClick} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    validateEleve(eleve) {
        return eleve.nom && eleve.prenom;
    }

    handleEditClick(eleve) {
        // clone eleve selectionné
        let selected = Object.assign({ isValid: true }, eleve);
        this.setState({
            selected: selected
        });
    }

    handleAddClick(eleve) {
        this.setState({ selected: {} });
    }

    handleFieldChange(e) {
        let updatedSelected = this.state.selected;
        updatedSelected[e.target.name] = e.target.value;

        updatedSelected['isValid'] = this.validateEleve(this.state.selected);

        this.setState({ selected: updatedSelected });
    }

    handleDeleteClick(eleve) {
        //todo: ajouter un prompt 'êtes-vous sûr de vouloir supprimer?'

        // vider les champs ou cas ou on supprime l'élève qui est en cours d'edition
        let selected = eleve.id === this.state.selected.id ? {} : this.state.selected;
        this.setState({
            eleves: this.state.eleves.filter((el) => {
                return el.id !== eleve.id;
            }),
            selected: selected
        });
    }

    handleCancelClick(e) {
        this.setState({ selected: '' });
    }

    handleSaveClick(e) {
        var existingId = -1;

        // chercher si un élève avec cet id existe
        let existing = this.state.eleves.find(function(el, index) {
            if (el.id === this.state.selected.id) {
                existingId = index;
                return true;
            }
            return false;
        }.bind(this));

        // màj d'un élève existant
        if (existingId > -1) {
            this.state.eleves[existingId] = this.state.selected;

        // ajout d'un nouvel élève
        } else {
            this.state.eleves.push(Object.assign({ id: this.state.eleves.length + 1 }, this.state.selected));
        }

        this.setState({
            eleves: this.state.eleves,
            selected: ''
        });

        e.preventDefault();
    }
}

export default App
