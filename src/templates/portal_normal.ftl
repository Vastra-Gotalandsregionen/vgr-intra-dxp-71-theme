<!DOCTYPE html>

<#include init />

<html class="${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}">

<head>
	<title>${the_title} - ${company_name}</title>

	<meta content="initial-scale=1.0, width=device-width" name="viewport" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<script type="text/javascript" src="${javascript_folder}/pojs.js"></script>

	<@liferay_util["include"] page=top_head_include />
</head>

<body class="${css_class}">

<@liferay_ui["quick-access"] contentId="#main-content" />

<@liferay_util["include"] page=body_top_include />

<@liferay.control_menu />

<div class="container-fluid" id="wrapper">
	<header id="banner" role="banner">

		<#if top_alert_article_id?has_content>
			<div id="topAlert">
				<div class="container-normal">
					<@includeWCD group_id=group_id article_id=top_alert_article_id />
				</div>
			</div>
		</#if>

		<a href="#mobileMenuTrigger" id="mobileMenuTrigger">
	    <span class="sr-only">Meny</span>
	    <span class="icon-bar"></span>
	    <span class="icon-bar"></span>
	    <span class="icon-bar"></span>
    </a>

		<div id="topBar">
			<div class="container-normal">

				<a class="logo-vgr ${logo_css_class}" href="${site_default_public_url}">

					<#assign logo_src = images_folder + "/theme/logo/vgr-logo-white.png" />

					<#if layout.layoutSet.isLogo()>
						<#assign logo_src = site_logo />
					</#if>

					<img src="${logo_src}" alt="V&auml;stra G&ouml;talandsregionen" />
				</a>

				<div class="top-bar-tools">

					<div class="top-bar-navigation">

						<#--
						-->
						<#if topnav_article_id?has_content>
							<@includeWCD group_id=group_id article_id=topnav_article_id />
						</#if>

						<#if !is_signed_in>
							<a href="${sign_in_url}" data-redirect="${is_login_redirect_required?string}" id="signIn" class="signin" rel="nofollow">${sign_in_text}</a>
						<#else>
							<a href="${sign_out_url}" id="signOut" class="signout" rel="nofollow">${sign_out_text}</a>
						</#if>

					</div>

					<#if show_search && search_layout_friendly_url != "">
						<span class="top-search searchbox">
							<#include "${full_templates_path}/search.ftl" />
						</span>
					</#if>

				</div>

			</div>
		</div>

		<div id="navBar">
			<div class="container-normal">

					<#--
					<div class="tools-wrap">
						<#include "${full_templates_path}/nav_bar_tools.ftl" />
					</div>
					-->

					<div class="navigation-wrap">
						<#if has_navigation || is_signed_in>
							<#--
								<#include "${full_templates_path}/navigation.ftl" />
							-->
							<#include "${full_templates_path}/navigation-with-drop.ftl" />
						</#if>
					</div>
			</div>
		</div>



	</header>

	<section id="content">
		<div class="container-normal">


		<h1 class="hide-accessible">${the_title}</h1>

			<#--
			<nav id="breadcrumbs">
				<@liferay.breadcrumbs />
			</nav>
			-->

			<#if selectable>
				<@liferay_util["include"] page=content_include />
			<#else>
				${portletDisplay.recycle()}

				${portletDisplay.setTitle(the_title)}

				<@liferay_theme["wrap-portlet"] page="portlet.ftl">
					<@liferay_util["include"] page=content_include />
				</@>
			</#if>

		</div>
	</section>

	<div class="footer-push"></div>

</div>

<#include "${full_templates_path}/footer.ftl" />

<@liferay_util["include"] page=body_bottom_include />

<script type="text/javascript" src="${javascript_folder}/jquery/jquery.min.js"></script>
<script type="text/javascript" src="${javascript_folder}/handlebars/handlebars.min.js"></script>
<script type="text/javascript" src="${javascript_folder}/jquery/jquery-handlebars/jquery-handlebars.min.js"></script>

<script type="text/javascript" src="${javascript_folder}/jq.js"></script>


<@liferay_util["include"] page=bottom_include />

<!-- inject:js -->
<!-- endinject -->

</body>

</html>
