<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:
        
if ( !function_exists( 'chld_thm_cfg_parent_css' ) ):
    function chld_thm_cfg_parent_css() {
        wp_enqueue_style( 'chld_thm_cfg_parent', trailingslashit( get_template_directory_uri() ) . 'style.css' ); 
    }
endif;
add_action( 'wp_enqueue_scripts', 'chld_thm_cfg_parent_css' );

// END ENQUEUE PARENT ACTION



add_action( 'wp_enqueue_scripts', 'child_add_scripts' );

/**
 * Register and enqueue a script that does not depend on a JavaScript library.
 */
function child_add_scripts() {
wp_enqueue_style( 'style', get_stylesheet_uri() );

    wp_register_script(
        'acegiakJavascript',
        get_stylesheet_directory_uri() . '/acegiakJavascript.js',
		array( 'jquery' )
    );

    wp_enqueue_script( 'acegiakJavascript' );
}


function mf2_s_acegiak_widgets_init() {

	register_sidebar( array(
		'name'          => 'Head sidebar',
		'id'            => 'head-sidebar',
		'before_widget' => '<div>',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="rounded">',
		'after_title'   => '</h2>',
	) );

}
add_action( 'widgets_init', 'mf2_s_acegiak_widgets_init' );


//disable autoembeds
remove_filter( 'the_content', array( $GLOBALS['wp_embed'], 'autoembed' ), 8 );
