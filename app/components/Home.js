import React from "react";
import DuckImage from "assets/images/Duck.jpg";

export default () => (
	<div className={"home"}>
		<p><b>UrbanCard</b> - система, предназначенная для держателей электронных проездных
			документов.</p>
		<p>Это главная страница сайта, на которой я потом помещу какую-нибудь инфу.</p>
		<p>И вот вам картинка уточки для прикола :)</p>
		<img srcSet={DuckImage} />
	</div>
);
