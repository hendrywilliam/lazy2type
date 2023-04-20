export default function (grammarList?: string[]): SpeechRecognition | any {
    //check apakah support apa tidak browser nya
    //https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#browser_compatibility
    if ("webkitSpeechRecognition" in window) {
        const recognition = new webkitSpeechRecognition();

        /**
         * --OPTIONAL--
         * grammar adalah sebuah koleksi dari object SpeechGrammar yang merepresentasikan
         * aturan-aturan yang bisa dimengerti SpeechRecognition
         */
        if (grammarList) {
            //buat instance dari class SpeechGrammarList
            const speechRecognitionList = new webkitSpeechGrammarList();
            //format JSGF.
            const grammar =
                "#JSGF V1.0; grammar words; public <word> = " +
                grammarList.join(" | ") +
                " ;";
            speechRecognitionList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionList;
        }

        /**
         * x.continous
         * --------------
         * false -> hanya akan mendengar satu kata/frasa (sampai satu hasil pengenalan diterima)
         * true -> akan terus mendengar ucapan sampai metode .stop() dipanggil.
         */

        recognition.continuous = true;
        //set bahasa dari SpeechRecognition (representasi dari tag BCP-47)
        //tag lainnya: https://www.techonthenet.com/js/language_tags.php
        recognition.lang = "id-ID";

        //apakah mau ngereturn nilai yang sementara atau tidak (?)
        recognition.interimResults = true;

        //berapa alternative dari hasil
        recognition.maxAlternatives = 1;

        return recognition;
    } else {
        console.log(
            "Speech recognition is not available in your browser, try to change it?"
        );
        return;
    }
}
