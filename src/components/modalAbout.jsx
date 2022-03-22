import React, { useState } from 'react';
import ReactModal from 'react-modal';

const ModalAbout = (props) => {

  return (
    <ReactModal
      isOpen={props.isOpen}
      ariaHideApp={false}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
          position: 'absolute',
          top: '20px',
          left: '20%',
          right: '20%',
          bottom: '20px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '40px'
        }
      }}
    >
      <div className="modal-header text-center">
        <h2 className="modal-title" >FAQ</h2>
      </div>
      <div className="modal-body">
        <h5>Why?</h5>
        <p className="mx-3">
        This web app was made as a way to combine my three loves: coding, statistics, and Dungeons & Dragons.
        I wanted to test my abililites in web development. Specifically this website uses <a href="https://reactjs.org/" target="_blank">Reactjs</a> and <a href="https://plotly.com/" target="_blank">Plotly</a>.
        In order to make this website I had to learn API from the software that
        we use for our games. There is also javascript under the hood that calculates all the results that get used in the plots.
        </p>
        <h5>This is the nerdiest thing I've ever seen.</h5>
        <p className="mx-3">I think you mean the coolest.</p>
        <h5>What is this for?</h5>
        <p className="mx-3">
          <a href="https://foundryvtt.com/" target="_blank">Foundry Virtual Tabletop</a> is a way for people to play popular table-top roleplaying games (TTRPG)
          like <a href="https://en.wikipedia.org/wiki/Dungeons_%26_Dragons" target="_blank">Dungeons & Dragons</a> (D&D) online.
          These games are where people get together to tell a collaborative story together using their imaginations and a set of rules that help dictate
          where the story will go. Most of the players take on a role of a single character while one player takes on the role of the game-master (GM) where they present
          the fantastical world that these characters are in and the friends or foes they meet in their adventures. Often times, when a player-character attempts a task
          where the result is uncertain, the player will roll some dice to see what happens.
        </p>
        <p className="mx-3">
          Playing online using a virtual tabletop gives the advantage of having all the dice rolls recorded. What this app does is synthesizes the data of rolls made by players and
          lays them out in neat plots. These are fun to look at because you can tell how lucky you were in your game. This app focuses only on the combination of FoundryVTT and D&D
          since that is what me and my friends use.
        </p>
        <h5>How accurate are these plots?</h5>
        <p className="mx-3">
          They are accurate but are most likely missing or misinterpreting data. It is mainly limited by what is recorded on FoundryVTT.
          Often times the damage from dice is halved or rolls were accidentally made with the wrong skill/weapon/character.
          But because these facts are not recorded, they don't show up on the plots. These results are best enjoyed with that in mind.
        </p>
        <h5>How does this work?</h5>
        <p className="mx-3">
          First you need to have data of dice rolls from FoundryVTT.
          You get that by running <a href="https://github.com/timjancic/dnd-stats-react-app/blob/main/get-roll-data-macro.txt" target="_blank">this script macro</a> inside
          foundry. It takes the rolls from your chat log and prints them to a journal in Foundry.
          Then click the "Use Your Own Data" button on the main page. You can either copy and
          paste or upload a text file of the data. Once it is uploaded, change the player-character Names
          to those that are in your campaign and click submit!
        </p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={() => props.onClose()}>Close</button>
      </div>
    </ReactModal>
  )
}

export default ModalAbout;
