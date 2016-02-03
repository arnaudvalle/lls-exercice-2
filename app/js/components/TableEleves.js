import React from 'react';

const TableEleves = ({ eleves, handleEditClick, handleDeleteClick }) => {
    var rows = eleves.map((el, index) => {
        return (
            <tr key={index}>
                <td>{el.prenom} {el.nom}</td>
                <td>
                    <button type="button" className="btn" onClick={handleEditClick.bind(this, el)}>Editer</button> <button type="button" className="btn" onClick={handleDeleteClick.bind(this, el)}>Supprimer</button>
                </td>
            </tr>
        )
    });
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

TableEleves.propTypes = {
    eleves: React.PropTypes.array.isRequired,
    handleEditClick: React.PropTypes.func.isRequired,
    handleDeleteClick: React.PropTypes.func.isRequired
}

export default TableEleves;
