import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({

  service: 'gmail',
  auth: {
    user: 'ecodescva@gmail.com', 
    pass: 'ecodescVA..' 
  }
});

const enviarEmail = async (req, res) => {
  const { assunto, nome, mensagem, email } = req.body;

  try {
    const mailOptions = {
      from: "ecodescva@gmail.com", 
      to: 'ecodescva@gmail.com', 
      subject: assunto,
      text: `Email: ${email}\nNome: ${nome}\n\nMensagem: ${mensagem}`
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
  }
};

export { enviarEmail };
