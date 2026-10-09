// Máscaras de CPF, telefone e CEP + mensagem de confirmação do cadastro.
(function () {
  'use strict';

  function soNumeros(v, max) { return v.replace(/\D/g, '').slice(0, max); }

  var mascaras = {
    cpf: function (v) {
      v = soNumeros(v, 11);
      return v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    },
    telefone: function (v) {
      v = soNumeros(v, 11);
      if (v.length > 10) return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      if (v.length > 6) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      if (v.length > 2) return v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      return v;
    },
    cep: function (v) {
      v = soNumeros(v, 8);
      return v.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
  };

  Object.keys(mascaras).forEach(function (id) {
    var campo = document.getElementById(id);
    if (!campo) return;
    campo.addEventListener('input', function () { campo.value = mascaras[id](campo.value); });
  });

  // Mostra confirmação ao enviar o cadastro (a validação nativa roda antes do evento "submit")
  var form = document.getElementById('form-cadastro');
  if (form) {
    var aviso = document.getElementById('aviso');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      aviso.textContent = 'Cadastro enviado com sucesso! Entraremos em contato em breve.';
      aviso.hidden = false;
      form.reset();
      aviso.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();
