import React from "react";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Footer from "./Footer";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {Spinner} from './Spinner.js';
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/mestoAuth";
import {Route, Switch, useHistory, withRouter} from "react-router-dom";

export default withRouter(App);

function App() {
    const history                                             = useHistory();
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
              React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]       = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]   =
              React.useState(false);
    const [selectedCard, setSelectedCard]                     = React.useState({});
    const [currentUser, setCurrentUser]                       = React.useState({});
    const [cards, setCards]                                   = React.useState([]);
    const [isImagePopupOpen, setImagePopupOpen]               = React.useState(false);
    const [isLoading, setIsLoading]                           = React.useState(false);
    const [isLoading2, setIsLoading2]                         = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen]           = React.useState(false);
    const [status, setStatus]                                 = React.useState(false);
    const [loggedIn, setLoggedIn]                             = React.useState(false);
    const [email, setEmail]                                   = React.useState("");

    React.useEffect(() => {
        tokenCheck();
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

    function handleCardDelete(card) {
        api
            .removeCard(card._id)
            .then(() => {
                const newCards = cards.filter((elem) => elem !== card);
                setCards(newCards);
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

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
        setIsInfoTooltipOpen(false);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }

    function handleUpdateUser({name, about}) {
        api
            .editUserInfo(name, about)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar({avatar}) {
        api
            .editUserAvatar(avatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit({name, link}) {
        setIsLoading2(true)
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
            })

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

    return (
        isLoading ? (
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
                            onCardDelete={handleCardDelete}
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

                    {/* start popup edite avatar */}

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />

                    {/* end popup edite avatar */}

                    {/* start popup ask */}
                    <PopupWithForm
                        title="Вы уверены?"
                        name="remove-card"
                        buttonText="Да"
                        onClose={closeAllPopups}></PopupWithForm>
                    {/* end popup ask */}

                    {/* start popup img */}

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
        )
    );
}
