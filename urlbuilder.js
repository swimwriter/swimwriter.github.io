(function(win){

let $PIC_CRAZY = "/http:\/\/pzy.be\/(v|t|i)\/(.*)\/(.*)\.(.*)/";
let $GOOGLE_IMAGE = "/(http|https):\/\/(.*.blogspot.com|.*.google.com|.*.googleusercontent.com)\/(.*)\/(.*)\/(.*)\/(.*)\/s(.*)\/(.*)/";
let $GOOGLE_IMAGE2 = "/(http|https):\/\/(.*.googleusercontent.com)\/(.*)=w(.*)-h([0-9]*)-(.*)/";
let $AFF_IMAGE = "/(http|https):\/\/(.*.pop6.com)\/(.*)\.(main|square|superphoto|192x192|gallery)\.(.*)/";
let $AFF_IMAGE2 = "/(http|https):\/\/(.*.securedataimages.com)\/(.*)\.(main|square|superphoto|192x192|gallery)\.(.*)/";
let $TSE_IMAGE = "/([\/]*)(gallery\/albums\/users)\/([0-9]*)\/(images)\/(.*)\.(.*)/";
let $TSE_IMAGE_FULL = "/(http|https):\/\/(.*.swimstories.com|.*.theroticstories.com)\/(gallery\/albums\/users)\/([0-9]*)\/(images)\/(.*)\.(.*)/";
let $WP_IMAGE_THUMB = "/(http|https):\/\/(.*)\/wp-content\/uploads\/(.*)-([0-9]*)x([0-9]*)\.(.*)/";
let $SEX_COM = "/(http|https):\/\/(images\.sex\.com)\/images\/pinporn\/([0-9]*)\/([0-9]*)\/([0-9]*)\/([0-9]*)\/([0-9]*)\.(\w*)(.*)/";
let $TWITTER_COM = "/(http|https):\/\/(pbs\.twimg\.com)\/media\/(.*)\.([\w]*):?(.*)/";
let $TUMBLR = "/(http|https):\/\/(.*)\.(media\.tumblr\.com)\/(.*)\/(.*)\_([0-9]*)\.(.*)/";
let $CLOUDINARY = "/(http|https):\/\/(res\.cloudinary\.com)\/(.*)\/image\/(upload\/?(.*))\/([\w]+)\.?(.*)/";
let $FLICK_IMAGE = "/(http|https):\/\/(.*\.staticflickr\.com|.*\.yimg\.com)\/(.*)\_([0-9a-zA-Z]*)\_([0-9a-zA-Z])\.(.*)/";
let $XVDO_IMAGE = "/(http|https):\/\/(.*.xvideos.com)\/(.*\/.*)\_(thumbl|big|thumb)\.(.*)/";
let $DEVIANT_IMAGE = "/(http|https):\/\/.*\.deviantart\.net\/.*=\/.*origin\(\)\/(pre[0-9]*)\/(.*)/";
let $DEVIANT_IMAGE2 = "/(http|https):\/\/(.*)\.deviantart\.net\/(.*)/";
let $PINTEREST = "/(http|https):\/\/(.*)\.pinimg\.com\/([0-9]*)x([0-9]*)\/(.*)\.(.*)/";
let $SEXY_FRENZ = "/(http|https):\/\/(.*\.sexyfrenz\.com)\/.*\/(.*)\/(.*)\/([\w0-9=]*)\.?(.*)/";
let $SEXY_FRENZ_ID = "/(https?:)*\/\/(.*\.sexyfrenz\.com)\/([a-zA-Z]+)([0-9]*)\/(.*)\/(.*)\/([\w0-9=]*)\.?(.*)/";
let $SMUTTY = "/(https?:)*\/\/(.*\.smutty\.com\/.*)\/(w|m|b)\/(.*)\.(.*)/";
let $NANGASPACE = "/(https?:)*\/\/(.*\.nangaspace\.com)\/(upload\/|thumbs\/|view_image.php\?img=)(.*)\.(.*)/";
let $LUCIOUS = "/(https?:)*\/\/(cdnio\.luscious\.net)\/(.*)_([0-9]*)(?:\.([0-9x]*))?\.(.*)/";

function preg_match(pattern,input="",matches=[]){
	let _pattten = pattern.substr(1,pattern.length-2);
	var _matches = input.match(new RegExp(_pattten)) || [];
	matches.splice(0,matches.length-1);
	for(var i=0;i<_matches.length;i++){
		matches.push(_matches[i])
	}
	//console.log(input,matches);
	return _matches.length >0 ? 1 : 0
}
function sprintf(format){
	var args = Array.prototype.slice.call(arguments, 1);
	let i = -1;
	return format.replace(/%s/g, function(match, number) { 
		console.log("---",match, number,"====",i)
		i++;
      return typeof args[i] != 'undefined'
        ? args[i] 
        : match
      ;
    });
}

function knowImage( { $full, $thumb, $small, $link, $cloud_name, $cloud_id, $format, $options}){
			function collect(){
				return {
					$full, $thumb, $small, $link, $cloud_name, $cloud_id, $format, $options
				}
			};
            let $matchs = [];
            let $urlString = "";
            if (preg_match("/http:\/\/(.*)\.(swimstories|theroticstories)\.com\/(.*)/", $full, $matchs) == 1) {
                //header("HTTP/1.0 404 Not Found");
                $options["on_swim"] = true;
            } else if (preg_match($CLOUDINARY, $full, $matchs) == 1
                || preg_match($CLOUDINARY, $small, $matchs) == 1
                || preg_match($CLOUDINARY, $thumb, $matchs) == 1
                || preg_match($CLOUDINARY, $link, $matchs) == 1
            ) {
                $cloud_name = $matchs[3];
                $cloud_id = $matchs[6];
                $format = $matchs[7];
                $options["on_cloud"] = true;
                return collect();
            } else if (preg_match($SEXY_FRENZ, $full, $matchs) == 1
                || preg_match($SEXY_FRENZ, $small, $matchs) == 1
                || preg_match($SEXY_FRENZ, $thumb, $matchs) == 1
                || preg_match($SEXY_FRENZ, $link, $matchs) == 1
            ) {
                $cloud_name = $matchs[3];
                $cloud_id = $matchs[5];
                $format = $matchs[6];
                $options["on_cloud"] = true;
                return collect();
            } else if (preg_match($PIC_CRAZY, $full, $matchs) == 1
                || preg_match($PIC_CRAZY, $thumb, $matchs) == 1
                || preg_match($PIC_CRAZY, $link, $matchs) == 1
            ) {
                $urlString = "http://pzy.be/%s/%s/%s.%s";
                $full = sprintf($urlString, "i", $matchs[2], $matchs[3], $matchs[4]);
                $link = sprintf($urlString, "v", $matchs[2], $matchs[3], $matchs[4]);
                $thumb = sprintf($urlString, "t", $matchs[2], $matchs[3], $matchs[4]);
                $format = $matchs[4];

                $options["xs"] = $thumb;
                $options["sm"] = $thumb;
                $options["smth"] = $thumb;
                $options["mth"] = $thumb;
                $options["lg"] = $full;

                return collect();
            } else if (preg_match($GOOGLE_IMAGE, $full, $matchs) == 1
                || preg_match($GOOGLE_IMAGE, $thumb, $matchs) == 1
                || preg_match($GOOGLE_IMAGE, $link, $matchs) == 1
            ) {
                $excp = null;
                if(preg_match("/([0-9]+)\.bp\.blogspot\.com/",$matchs[2],$excp) ==1 ){
                    if($excp[1]=="3"){
                        $matchs[2] = "4.bp.blogspot.com";
                    }
                }

                $urlString = "%s://%s/%s/%s/%s/%s/s%s/%s";
                $full = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], $matchs[6], "1600", $matchs[8]);
                $thumb = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], $matchs[6], "400", $matchs[8]);
                $small = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], $matchs[6], "200", $matchs[8]);

                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], $matchs[6], "50", $matchs[8]);
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], $matchs[6], "100", $matchs[8]);
                $options["smth"] = $small;
                $options["mth"] = $thumb;
                $options["lg"] = $full;
                $options["hash"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], $matchs[6], "%", $matchs[8]);

                return collect();
            } else if (preg_match($GOOGLE_IMAGE2, $full, $matchs) == 1
                || preg_match($GOOGLE_IMAGE2, $thumb, $matchs) == 1
                || preg_match($GOOGLE_IMAGE2, $link, $matchs) == 1
            ) {

                $urlString = "%s://%s/%s=w%s-h%s-%s";
                $full = sprintf("%s://%s/%s=s%s", $matchs[1], $matchs[2], $matchs[3], "3200");
                $thumb = sprintf("%s://%s/%s=s%s", $matchs[1], $matchs[2], $matchs[3], "400");
                $small = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "200", "200", $matchs[6]);
                //$format = $matchs[6];

                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "50", "50", $matchs[6]);
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "100", "100", $matchs[6]);
                $options["smth"] = $small;
                $options["mth"] = $thumb;
                $options["lg"] = $full;
                $options["hash"] = sprintf("%s://%s/%s=%s", $matchs[1], $matchs[2], $matchs[3], "%");

                return collect();
            } else if (preg_match($AFF_IMAGE, $full, $matchs) == 1
                || preg_match($AFF_IMAGE, $thumb, $matchs) == 1
                || preg_match($AFF_IMAGE, $link, $matchs) == 1
                || preg_match($AFF_IMAGE2, $full, $matchs) == 1
                || preg_match($AFF_IMAGE2, $thumb, $matchs) == 1
                || preg_match($AFF_IMAGE2, $link, $matchs) == 1
            ) {
                //$matchs[5] = "jpg";
                $full = $matchs[1] + "://" + $matchs[2] + "/" + $matchs[3] + ".superphoto." + $matchs[5];
                $thumb = $matchs[1] + "://" + $matchs[2] + "/" + $matchs[3] + ".main." + $matchs[5];
                $format = $matchs[5];
                $urlString = "%s://%s/%s.%s.%s";
                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "square", $matchs[5]);
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "192x192", $matchs[5]);
                $options["smth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "main", $matchs[5]);
                $options["mth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "superphoto", $matchs[5]);
                $options["lg"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "superphoto", $matchs[5]);
                $options["hash"] = sprintf("%s://%s/%s.%s.%s", $matchs[1], $matchs[2], $matchs[3], "%", "%");

                return collect();
            } else if (preg_match($XVDO_IMAGE, $full, $matchs) == 1
                || preg_match($XVDO_IMAGE, $thumb, $matchs) == 1
                || preg_match($XVDO_IMAGE, $link, $matchs) == 1
            ) {
                $urlString = "%s://%s/%s_%s.%s";
                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "thumb", $matchs[5]);
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "thumb", $matchs[5]);
                $options["smth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "thumbl", $matchs[5]);
                $options["mth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "thumbl", $matchs[5]);
                $options["lg"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "big", $matchs[5]);
                $full = $options["lg"];
                $thumb = $options["sm"];
                 $format = $matchs[5];
                return collect();
            } else if (preg_match($WP_IMAGE_THUMB, $full, $matchs) == 1
                || preg_match($WP_IMAGE_THUMB, $thumb, $matchs) == 1
                || preg_match($WP_IMAGE_THUMB, $link, $matchs) == 1
            ) {
                $full = $matchs[1] + "://" + $matchs[2] + "/wp-content/uploads/" + $matchs[3] + "." + $matchs[6];
                $thumb = $matchs[0];
                 $format = $matchs[6];

                $urlString = "%s://%s/wp-content/uploads/%s%s.%s";
                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "-150x150", $matchs[6]);
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "-150x150", $matchs[6]);
                $options["smth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "-" + $matchs[4] + "x" + $matchs[5], $matchs[6]);
                $options["mth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "", $matchs[6]);
                $options["lg"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], "", $matchs[6]);

                $options["half_match_found"] = true;
                return collect();
            } else if (preg_match($SEX_COM, $full, $matchs) == 1
                || preg_match($SEX_COM, $thumb, $matchs) == 1
                || preg_match($SEX_COM, $link, $matchs) == 1
            ) {
                $full = $matchs[1] + "://" + $matchs[2] + "/images/pinporn/" + $matchs[3] + "/" + $matchs[4] + "/" + $matchs[5] + "/620/" + $matchs[7] + "." + $matchs[8];
                $thumb = $matchs[1] + "://" + $matchs[2] + "/images/pinporn/" + $matchs[3] + "/" + $matchs[4] + "/" + $matchs[5] + "/236/" + $matchs[7] + "." + $matchs[8];
                 $format = $matchs[8];
                 //secho "Formy".$matchs[8];

                $urlString = "%s://%s/images/pinporn/%s/%s/%s/%s/%s.%s";
                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], "60x60", $matchs[7], $matchs[8]);
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], "126x126", $matchs[7], $matchs[8]);
                $options["smth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], "236", $matchs[7], $matchs[8]);
                $options["mth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], "620", $matchs[7], $matchs[8]);
                $options["lg"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], "620", $matchs[7], $matchs[8]);
                return collect();
            } else if (preg_match($TWITTER_COM, $full, $matchs) == 1
                || preg_match($TWITTER_COM, $small, $matchs) == 1
                || preg_match($TWITTER_COM, $thumb, $matchs) == 1
                || preg_match($TWITTER_COM, $link, $matchs) == 1
            ) {
                $full = $matchs[1] + "://" + $matchs[2] + "/media/" + $matchs[3] + "." + $matchs[4] + ":large";
                $small = $matchs[1] + "://" + $matchs[2] + "/media/" + $matchs[3] + "." + $matchs[4] + ":small";
                $thumb = $matchs[1] + "://" + $matchs[2] + "/media/" + $matchs[3] + "." + $matchs[4] + ":thumb";
                 $format = $matchs[4];

                $urlString = "%s://%s/media/%s.%s%s%s";
                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4],":", "thumb");
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], ":","small");
                $options["smth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4],":", "small");
                $options["mth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4],":", "medium");
                $options["lg"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4],":", "large");
                $options["twitter_id"] = $matchs[3];
                $options["hash"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4],"","%");
                return collect();
            } else if (preg_match($FLICK_IMAGE, $full, $matchs) == 1
                || preg_match($FLICK_IMAGE, $small, $matchs) == 1
                || preg_match($FLICK_IMAGE, $thumb, $matchs) == 1
                || preg_match($FLICK_IMAGE, $link, $matchs) == 1
            ) {
                $urlString = "%s://%s/%s_%s_%s." + $matchs[6];
                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], "s");
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], "t");
                $options["smth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], "n");
                $options["mth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], "z");
                $options["lg"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], "b");

                $full = $options["lg"];
                $small = $options["smth"];
                $thumb = $options["xs"];
                 $format = $matchs[6];
                return collect();
            } else if (preg_match($TUMBLR, $full, $matchs) == 1
                || preg_match($TUMBLR, $small, $matchs) == 1
                || preg_match($TUMBLR, $thumb, $matchs) == 1
                || preg_match($TUMBLR, $link, $matchs) == 1
            ) {
                $matchs[2]= ($matchs[2] < 68) ? 68 : $matchs[2];
                $full = $matchs[1] + "://" + $matchs[2] + "." + $matchs[3] + "/" + $matchs[4] + "/" + $matchs[5] + "_1280." + $matchs[7];
                $small = $matchs[1] + "://" + $matchs[2] + "." + $matchs[3] + "/" + $matchs[4] + "/" + $matchs[5] + "_400." + $matchs[7];
                $thumb = $matchs[1] + "://" + $matchs[2] + "." + $matchs[3] + "/" + $matchs[4] + "/" + $matchs[5] + "_100." + $matchs[7];
                 $format = $matchs[7];

                $urlString = "%s://%s.%s/%s/%s_%s.%s";
                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], "75sq", $matchs[7]);
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], "100", $matchs[7]);
                $options["smth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], "250", $matchs[7]);
                $options["mth"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], "400", $matchs[7]);
                $options["lg"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5], "1280", $matchs[7]);
                $options["tumblr_id"] = sprintf("%s://%s.%s/%s/%s_", $matchs[1], $matchs[2], $matchs[3], $matchs[4], $matchs[5]);
                $options["hash"] = sprintf($urlString, "%", "%", "media.tumblr.com", $matchs[4], $matchs[5], "%", "%");
                //'%://%.media.tumblr.com/23c577f9ddaf88d1a26bfb97fd59e1f4/tumblr_odwhwrWTgV1vdh16fo2_%.%';

            } else if (preg_match($DEVIANT_IMAGE, $full, $matchs) == 1
                || preg_match($DEVIANT_IMAGE, $small, $matchs) == 1
                || preg_match($DEVIANT_IMAGE, $thumb, $matchs) == 1
                || preg_match($DEVIANT_IMAGE, $link, $matchs) == 1
                || preg_match($DEVIANT_IMAGE2, $full, $matchs) == 1
                || preg_match($DEVIANT_IMAGE2, $small, $matchs) == 1
                || preg_match($DEVIANT_IMAGE2, $thumb, $matchs) == 1
                || preg_match($DEVIANT_IMAGE2, $link, $matchs) == 1
            ) {
                $urlString = "%s://%s.deviantart.net/%s";

                $options["xs"] = $matchs[0];//sprintf($urlString,$matchs[1],$matchs[2],$matchs[3]);
                $options["sm"] = $matchs[0]; //sprintf($urlString,$matchs[1],$matchs[2],$matchs[3]);
                $options["smth"] = $matchs[0]; //sprintf($urlString,$matchs[1],$matchs[2],$matchs[3]);
                $options["mth"] = $matchs[0]; //sprintf($urlString,$matchs[1],$matchs[2],$matchs[3]);
                $options["lg"] = sprintf($urlString, $matchs[1], $matchs[2], $matchs[3]);

                $full = $options["lg"];
                $thumb = $matchs[0];
                $small = $matchs[0];
                
                $options["half_match_found"] = true;
            } else if (preg_match($PINTEREST, $full, $matchs) == 1
                || preg_match($PINTEREST, $small, $matchs) == 1
                || preg_match($PINTEREST, $thumb, $matchs) == 1
                || preg_match($PINTEREST, $link, $matchs) == 1
            ) {
                //https://s-media-cache-ak0.pinimg.com/236x/6b/0a/5c/6b0a5c7c858a3a3783ba06c4aec95cbf.jpg
                $urlString = "%s://%s.pinimg.com/%s/%s.".$matchs[6];

                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2], "136x136",$matchs[5]);
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2], "170x",$matchs[5]);
                $options["smth"] = sprintf($urlString, $matchs[1], $matchs[2], "236x",$matchs[5]);
                $options["mth"] = sprintf($urlString, $matchs[1], $matchs[2], "236x" ,$matchs[5]);
                $options["lg"] = sprintf($urlString, $matchs[1], $matchs[2], "564x",$matchs[5]);

                $full = $options["lg"];
                $thumb = $options["smth"];
                $small =  $options["sm"];
                $format = $matchs[6];

           } else if (preg_match($SMUTTY, $full, $matchs) == 1
                || preg_match($SMUTTY, $small, $matchs) == 1
                || preg_match($SMUTTY, $thumb, $matchs) == 1
                || preg_match($SMUTTY, $link, $matchs) == 1
            ) {
                //https://s-media-cache-ak0.pinimg.com/236x/6b/0a/5c/6b0a5c7c858a3a3783ba06c4aec95cbf.jpg
                //(https?:)*\/\/(.*\.smutty\.com\/.*)\/(w|m|b)\/(.*)\.(.*)
                //https://s.smutty.com/media_smutty_2/d/m/b/w/b/dannyd-tqpvc-86767b.gif
                $urlString = "%s//%s/%s/%s.%s";

                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2],"w",$matchs[4],$matchs[5]);
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2],"m",$matchs[4],$matchs[5]);
                $options["smth"] = sprintf($urlString, $matchs[1], $matchs[2],"m",$matchs[4],$matchs[5]);
                $options["mth"] = sprintf($urlString, $matchs[1], $matchs[2],"b",$matchs[4],$matchs[5]);
                $options["lg"] = sprintf($urlString, $matchs[1], $matchs[2],"b",$matchs[4],$matchs[5]);

                $full = $options["lg"];
                $thumb = $options["smth"];
                $small =  $options["sm"];
                 $format = $matchs[5];
            } else if (preg_match($NANGASPACE , $full, $matchs) == 1
                || preg_match($NANGASPACE, $small, $matchs) == 1
                || preg_match($NANGASPACE, $thumb, $matchs) == 1
                || preg_match($NANGASPACE, $link, $matchs) == 1
            ) {
                $urlString = "%s//%s/%s/%s.%s";
                $format = $matchs[5];

                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2],"thumbs",$matchs[4],$matchs[5]);
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2],"thumbs",$matchs[4],$matchs[5]);
                $options["smth"] = sprintf($urlString, $matchs[1], $matchs[2],"thumbs",$matchs[4],$matchs[5]);
                $options["mth"] = sprintf($urlString, $matchs[1], $matchs[2],"upload",$matchs[4],$matchs[5]);
                $options["lg"] = sprintf($urlString, $matchs[1], $matchs[2],"upload",$matchs[4],$matchs[5]);

                $full = $options["lg"];
                $thumb = $options["smth"];
                $small =  $options["sm"];

            } else if (preg_match($LUCIOUS , $full, $matchs) == 1
                || preg_match($LUCIOUS, $small, $matchs) == 1
                || preg_match($LUCIOUS, $thumb, $matchs) == 1
                || preg_match($LUCIOUS, $link, $matchs) == 1
            ) {
                //$LUCIOUS = "/(https?:)*\/\/(cdnio\.luscious\.net)\/(.*)_([0-9]*)(?:\.([0-9x]*))?\.(.*)/";
                $urlString = "%s//%s/%s_%s%s.%s";
                $format = $matchs[6];

                $options["xs"] = sprintf($urlString, $matchs[1], $matchs[2],$matchs[3],$matchs[4],".100x100",$matchs[6]);
                $options["sm"] = sprintf($urlString, $matchs[1], $matchs[2],$matchs[3],$matchs[4],".315x0",$matchs[6]);
                $options["smth"] = sprintf($urlString, $matchs[1], $matchs[2],$matchs[3],$matchs[4],".315x0",$matchs[6]);
                $options["mth"] = sprintf($urlString, $matchs[1], $matchs[2],$matchs[3],$matchs[4],"",$matchs[6]);
                $options["lg"] = sprintf($urlString, $matchs[1], $matchs[2],$matchs[3],$matchs[4],"",$matchs[6]);

                $full = $options["lg"];
                $thumb = $options["smth"];
                $small =  $options["xs"];

            } else {
                if(preg_match("/(.*)\.(jpe?g|png|webp|gif|bmp|webm|mp4)/" , $full, $matchs) == 1){
                    $format = $matchs[2];
                }
                $options["xs"] = $thumb;
                $options["sm"] = $thumb;
                $options["smth"] = $small;
                $options["mth"] = $full;
                $options["lg"] = $full;
                $options["no_match_found"] = true;
            }
            return collect();
 }

win.knowImage = function(url){
	return knowImage({ 
		$full : url,
		$link : url,
		$thumb : url,
		$options : {}
	})
};

let COUNTER = 1;
$(document).ready(function(){

	$(".full-image-url").change(function(){
		let url = $(".full-image-url").val();
		if(!url) return;
		let info = win.knowImage(url);
			COUNTER++;

		Object.keys(info.$options).map(function(size){



		$(".gal-container").append(
		    `<div class="col-md-4 col-sm-6 co-xs-12 gal-item">
		      <div class="box">
			<a href="#" data-toggle="modal" data-target="#pic-${size}-${COUNTER}" class="img-wrap">
			  <img src="${info.$options[size]}">
			</a>
			<span download="custom-filename.jpg" class="size-link"
				title="${size}-${COUNTER}.${info.$format}">${size}.${info.$format}
			</span>
			<a download="${size}-${COUNTER}.${info.$format}"  class="download-link glyphicon glyphicon-download"
				href="${info.$options[size]}"
				title="${size}-${COUNTER}.${info.$format}">
			</a>
			<div class="modal fade" id="pic-${size}-${COUNTER}" tabindex="-1" role="dialog">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			      <div class="modal-body">
				<img src="${info.$options[size]}">
			      </div>
				<div class="col-md-12 description">
				  <h4>This is the first one on my Gallery</h4>
				</div>
			    </div>
			  </div>
			</div>
		      </div>
		    </div>`
		);



		})




	});




})

})(this);

