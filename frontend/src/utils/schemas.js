import * as yup from 'yup';

// login
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Formato de email inválido')
    .required('Email é obrigatório'),
  senha: yup.string().required('Senha é obrigatória'),
});
// cadastro
export const cadastroSchema = yup.object().shape({
  cidade: yup.string().required('Cidade é obrigatória'),
  bairro: yup.string().required('Bairro é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
  uf: yup.string().required('UF é obrigatório'),
  cep: yup.string().required('CEP é obrigatório'),
  nome: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Formato de email inválido.')
    .required('Email é obrigaatório.'),
  telefone: yup.string().required('Telefone é obrigatório'),
  senha: yup
    .string()
    .min(4, 'Senha deve conter pelo menos 4 caracteres.')
    .required('Senha é obrigatória'),
});
// criacao de areas
export const areasSchema = yup.object().shape({
  nome: yup.string().required('Preencha o nome antes de criar.'),
  // dtInicio: yup.string().required('Data de início não pode ser vazia.'),
  // dtTermino: yup.string().required('Data de término não pode ser vazia.'),
});
export const documentoSchema = yup.object().shape({
  titulo: yup.string().required('Título do documento não pode ser vazio'),
  descricao: yup.string().required('Descrição do documento não pode ser vazio'),
  documento: yup.mixed().required('O documento deve ser informado'),
});
export const avisoSchema = yup.object().shape({
  mensagem: yup
    .string()
    .required('Mensagem não pode ser vazia')
    .max(240, 'Mensagem muito longa'),
  img: yup.mixed().required(),
});
export const cadastroCondominoSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Formato de email inválido.')
    .required('Email é obrigatório.'),
  telefone: yup.string().required('Telefone é obrigatório'),
  senha: yup
    .string()
    .min(4, 'Senha deve conter pelo menos 4 caracteres.')
    .required('Senha é obrigatória'),
});
export const comentarioSchema = yup.object().shape({
  mensagem: yup
    .string()
    .required('Mensagem não pode ser vazia')
    .max(240, 'Mensagem muito longa'),
});
export const gastosSchema = yup.object().shape({
  comprovante: yup.mixed().required(''),
  valorTotal: yup.number().required('Valor é obrigatório.'),
  categoriaGasto: yup.string().required('Categoria de gasto é obrigatória.'),
  mes: yup.string().required('Mês não pode ser vazio.'),
})
// regex mascaras gerais
export const telefoneMask = [
  '(',
  /[1-9]/,
  /\d/,
  ')',
  ' ',
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const cepMask = [
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
];

export const cpfMask = [
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];
