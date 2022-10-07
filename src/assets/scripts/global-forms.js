/** 
 * MUST HAVE:
 * 1. input in wf name=email or name=Email
 * 2. wf forms include id "wf-form..."
 * 3. wf form include lottie somewhere near submit btn with attribute data-lottie
 * 4. elem which need to hide after submitted must have attribute data-form-submitted=hide
 * 5. (if need) if need to change another elem it have must attibute data-form-submitted=active
 * 
 **/

// Animate lottie after submit
let lottie, animations;
// Return a promise that resolves to true once animation is loaded
async function animationLoaded(animation) {
    if (animation.isLoaded) {
        return true
    }
    return new Promise((resolve, reject) => {
        animation.addEventListener('DOMLoaded', () => {
            resolve(true)
        })
    })
}
// Return a promise that resolves to true once all animations are loaded
async function waitForAnimationsLoaded(animations) {
    await Promise.all(animations.map(animationLoaded))
}
async function initAnimations() {
    lottie = Webflow.require('lottie').lottie
    animations = lottie.getRegisteredAnimations()
    await waitForAnimationsLoaded(animations)
}
var Webflow = Webflow || []
Webflow.push(() => {
    initAnimations()
        .then(() => {
            console.log('lotties initialised');
            $('[data-lottie*=form]').each(function(index, el) {
                let attr = $(this).attr('data-lottie');
                animations[index].name = attr;
                lottie.stop(attr);
                console.log(animations[index].name)
            });
        })
        .catch((error) => {
            console.error(error)
        })
})

// After submit
function isSpForm() {
    if ($('form[class^=sp-]').length) {
        // $('form[id^=wf-form-]').each(function(index, el) {
        //     if ($(this).find('input:submit').length) {
        //         console.log($(this))
        //     }            
        // });


        const spForm = $('form[class^=sp-]'),
            spInputs = $(spForm).find('input'),
            spButton = $(spForm).find('button');

        $('.w-input[name=email], .w-input[name=Email]').on('keyup', function() {
            $(spInputs[0]).val($(this).val());
        });
        $('form[id^=wf-form-]').submit(function(e) {
            let formSubmitted = $(e.target),
                lottieAttr = $(formSubmitted).find('[data-lottie]').attr('data-lottie'),
                isActive = $(formSubmitted).find('[data-form-submitted=active]').attr('data-form-submitted');
            $(formSubmitted).find('input:not(:submit)').val('');


            if (typeof isActive !== 'undefined' && isActive !== false) {
                $(formSubmitted).find('[data-form-submitted=active]').addClass('active');
            }

            $(formSubmitted).find('[data-form-submitted=hide]').fadeTo(300, 0);
            lottie.play(lottieAttr);
            setTimeout(() => {
                if (typeof isActive !== 'undefined' && isActive !== false) {
                    $(formSubmitted).find('[data-form-submitted=active]').removeClass('active');
                }
                $(formSubmitted).find('[data-form-submitted=hide]').fadeTo(300, 1)
                lottie.stop(lottieAttr)
            }, 3000);

            $(spButton).click();
            console.log('form was submitted')
            return false
        });
        console.log('isSpForm launched')
    } else { setTimeout(isSpForm, 1000) }
}
isSpForm();