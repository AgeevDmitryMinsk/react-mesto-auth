import React                                   from "react";
import Header                                  from "./Header";
import Main                                    from "./Main";
import ImagePopup                              from "./ImagePopup";
import EditProfilePopup                        from "./EditProfilePopup";
import EditAvatarPopup                         from "./EditAvatarPopup";
import AddPlacePopup                           from "./AddPlacePopup";
import Footer                                  from "./Footer";
import api                                     from "../utils/api";
import {CurrentUserContext}                    from "../contexts/CurrentUserContext";
import {Spinner}                               from "./Spinner.js";
import ProtectedRoute                          from "./ProtectedRoute";
import Register                                from "./Register";
import Login                                   from "./Login";
import InfoTooltip                             from "./InfoTooltip";
import * as auth                               from "../utils/mestoAuth";
import {Route, Switch, useHistory, withRouter} from "react-router-dom";
import ConfirmRemovePopup                      from "./ConfirmRemovePopup";
import {ESC_KEYCODE}                           from '../utils/constants';

export default withRouter(App);

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoading2, setIsLoading2] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [cardDelete, setCardDelete] = React.useState({});

  React.useEffect(() => {
    //функция закрытия попапов по Escape
    function handleEscClose(evt) {
      evt.key === ESC_KEYCODE && closeAllPopups();
    }

    //функция закрытия попапов по оверлей
    function handleOverlayClose(evt) {
      evt.target.classList.contains('popup__opened') && closeAllPopups();
    }

    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('click', handleOverlayClose);

    return () => {
      window.removeEventListener('click', handleOverlayClose);
      window.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    api
    .getInitialCards()
    .then((cardList) => {
      setCards(cardList);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          localStorage.removeItem('jwt');
          history.push('/sign-up');
          console.log(err);
        });
      }
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
    .changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((cards) =>
                 cards.map((currentCard) =>
                             currentCard._id === card._id ? newCard : currentCard
                 )
      );
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDeleteSubmit(card) {
    api
    .removeCard(card._id)
    .then(() => {
      const newCards = cards.filter((elem) => elem !== card);
      setCards(newCards);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  React.useEffect(() => {
    api
    .getUserInfo()
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setIsDeletePlacePopupOpen(true);
    setCardDelete(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleUpdateUser({name, about}) {
    setIsLoading2(true);
    api
    .editUserInfo(name, about)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading2(false);
    });
  }

  function handleUpdateAvatar({avatar}) {
    setIsLoading2(true);
    api
    .editUserAvatar(avatar)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading2(false);
    });
  }

  function handleAddPlaceSubmit({name, link}) {
    setIsLoading2(true);
    api
    .addCard(name, link)
    .then((data) => {
      setCards([data, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading2(false);
    });
  }

  function handleRegister(email, password) {
    auth
    .register(email, password)
    .then((res) => {
      if (res) {
        setIsInfoTooltipOpen(true);
        setStatus(true);
        history.push("/sign-in");
      }
    })
    .catch((err) => {
      console.log(err);
      setIsInfoTooltipOpen(true);
      setStatus(false);
    });
  }

  function handleLogin(email, password) {
    auth
    .login(email, password)
    .then((res) => {
      if (res) {
        localStorage.setItem("jwt", res.token);
        tokenCheck();
      }
    })
    .catch((err) => {
      console.log(err);
      setIsInfoTooltipOpen(true);
      setStatus(false);
    });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return isLoading ? (
    <Spinner/>
  ) : (
           <CurrentUserContext.Provider value={currentUser}>
             <div className="page">
               <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut}/>
               {/* main */}
               <Switch>
                 <ProtectedRoute
                   exact
                   path="/"
                   component={Main}
                   loggedIn={loggedIn}
                   onEditAvatar={handleEditAvatarClick}
                   onEditProfile={handleEditProfileClick}
                   onAddPlace={handleAddPlaceClick}
                   onCardClick={handleCardClick}
                   cards={cards}
                   onCardLike={handleCardLike}
                   onCardDelete={handleCardDeleteClick}
                 />
                 <Route path="/sign-in">
                   <Login onLogin={handleLogin}/>
                 </Route>
                 <Route path="/sign-up">
                   <Register onRegister={handleRegister}/>
                 </Route>
               </Switch>
               {/* end main */}

               {/* footer */}
               <Footer/>
               {/* end footer */}

               {/* popup profile */}

               <EditProfilePopup
                 isOpen={isEditProfilePopupOpen}
                 onClose={closeAllPopups}
                 onUpdateUser={handleUpdateUser}
                 isLoading2={isLoading2}
               />

               {/* end popup profile */}

               {/* start popup creat card */}

               <AddPlacePopup
                 isOpen={isAddPlacePopupOpen}
                 onClose={closeAllPopups}
                 onAddPlace={handleAddPlaceSubmit}
                 isLoading2={isLoading2}
               />

               {/* end popup creat card */}

               {/* start popup edit avatar */}

               <EditAvatarPopup
                 isOpen={isEditAvatarPopupOpen}
                 onClose={closeAllPopups}
                 onUpdateAvatar={handleUpdateAvatar}
                 isLoading2={isLoading2}
               />
               {/* end popup edit avatar */}


               <ConfirmRemovePopup
                 card={cardDelete}
                 isOpen={isDeletePlacePopupOpen}
                 onClose={closeAllPopups}
                 onCardConfirmRemovePopup={handleCardDeleteSubmit}
               />


               <ImagePopup
                 card={selectedCard}
                 onClose={closeAllPopups}
                 isOpen={isImagePopupOpen}
               />

               {/* end popup img */}
               <InfoTooltip
                 isOpen={isInfoTooltipOpen}
                 onClose={closeAllPopups}
                 status={status}
               />
             </div>
           </CurrentUserContext.Provider>
         );
}
