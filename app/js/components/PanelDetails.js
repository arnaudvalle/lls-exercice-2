import React from 'react';

const PanelDetails = ({ selected, handleSaveClick, handleFieldChange, handleCancelClick }) => {

    let couleurMoyenne = "";

    if (selected.moyenne > 12) {
        couleurMoyenne = "up";
    } else if (selected.moyenne > 8) {
        couleurMoyenne = "mid";
    } else if (selected.moyenne > -1) {
        couleurMoyenne = "down";
    }

    return (
        <div className={"user-panel" + (selected ? ' active' : '')}>

            <form onSubmit={ selected.isValid ? handleSaveClick : false } className="row form-horizontal">
                <div className="col-sm-4">
                    { /* Icones de Olesya Kozlova - https://thenounproject.com/olesyakozlova/ */ }
                    <img
                        src={"img/" + (selected.sexe || "m") + ".svg"}
                        className="user-panel__avatar"
                        alt="Avatar de {this.props.selected.prenom} {this.props.selected.nom}"/>
                    <p className={"user-panel__stat user-panel__stat--" + couleurMoyenne}>
                        {selected.moyenne || "--"}<br/>&mdash;<br/>20
                    </p>
                </div>
                <div className="col-sm-8">
                    <div className="form-group">
                        <label htmlFor="prenom">Prénom</label>
                        <input
                            type="text"
                            name="prenom"
                            id="prenom"
                            className="form-control"
                            value={selected.prenom}
                            onChange={handleFieldChange}
                            placeholder="Ex: Brann" />
                        <span className="bar"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="prenom">Nom</label>
                        <input
                            type="text"
                            name="nom"
                            id="nom"
                            className="form-control"
                            value={selected.nom}
                            onChange={handleFieldChange}
                            placeholder="Ex: Stark" />
                        <span className="bar"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sexe">Sexe</label>
                        <select
                            name="sexe"
                            id="sexe"
                            className="form-control"
                            onChange={handleFieldChange}
                            value={selected.sexe || 'm'}>
                                <option value="m">Masculin</option>
                                <option value="f">Féminin</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="remarques">Remarques</label>
                        <textarea
                            className="form-control"
                            rows="5"
                            id="remarques"
                            name="remarques"
                            placeholder="Détails sur les lacunes de l'élève, points à approfondir"
                            onChange={handleFieldChange}
                            value={selected.remarques || ''}></textarea>
                        <span className="bar"></span>
                    </div>
                    <div className="form-group pull-right">
                        <button
                            type="button"
                            className="btn btn--secondary btn--lg btn--effect"
                            onClick={handleCancelClick}>Annuler</button>
                        <button
                            type="submit"
                            className="btn btn--secondary btn--lg btn--effect"
                            disabled={!selected.isValid}>Enregistrer</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PanelDetails
