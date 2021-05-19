const env = require('dotenv');
const supabase_module = require("@supabase/supabase-js");
const supabaseURL = env.config().parsed.API_URL;
const supabaseKEY = env.config().parsed.API_KEY;
const supabase = supabase_module.createClient(supabaseURL, supabaseKEY);

// Atualiza palpite já existente
const UPDATE_PALPITE = async(email, palpite_novo, id_partida) => {
    // console.log('ID: '+ id_palpite+' '+email+' '+palpite_novo);
    var body = await supabase.from('Testes')
        .update({ palpite: palpite_novo, hora: new Date(Date.now()).toISOString() })
        .match({email: email, id_partida: id_partida})
    return body;
}

// Insere novo palpite
const INSERT_PALPITE = async(email, palpite, id_partida) => {
    // console.log('ID: '+ id_palpite+' '+email+' '+palpite_novo);
    var body = await supabase.from('Testes')
        .insert({email: email, id_partida: id_partida, palpite: palpite, hora: new Date(Date.now()).toISOString()});
    return body;
}

// Coleta id da partida e email. 
// Serve para futura verificação,
// caso palpite anterior na mesma partida tenha sido feito.
const UPSERT_PALPITE = async (email, palpite, id_partida) => {
    var body = await supabase.from('Testes')
        .select('id_partida, email')
        .eq('id_partida', id_partida);
    return body;
}

let email = supabase.currentUser.email;

// Exemplo funcional:
// Insere, caso não exista ou atualiza caso já exista palpite de vss6 para id_partida
// let email = 'email';
// let palpite = 'Central';
// let id_partida = 'd8fac3bd-2d31-4239-87fc-07c280435ae0';

// Verifica se o usuário logado já tem palpite nessa partida
function jaPalpitou(value){
    return value.email == email;
}

// Implementação de upsert (update ou insert) no front-end
UPSERT_PALPITE(email, palpite, id_partida).then(
    o => {
        console.log(o);
        if(o.data.filter( jaPalpitou ).length > 0){ 
            UPDATE_PALPITE(email, palpite, id_partida)
                .then(o2 => console.log('Tentativa de update: ',o2));
            // UPDATE_PALPITE(o.data[0].id_partida, 'vss2', 'Sport')
        } else {
            // INSERT_PALPITE(supabase.currentUser.email, )
            INSERT_PALPITE(email, palpite, id_partida)
                .then(o2 => console.log('Tentativa de insert: ',o2));
        }
    }
);
