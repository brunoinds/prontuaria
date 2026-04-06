

const homePrescriptions = [
    {
        diagnosis: 'M545',
        text: `
        <b>1) IBUPROFENO 300mg</b>
        <p>Tomar 2 comprimidos cada 8h por 5 dias</p>
        <br>
        <b>2) CICLOBENZAPRINA 10mg</b>
        <p>Tomar 1 comprimido cada 12h por 3 dias</p>
        `
    },
    {
        diagnosis: 'K29',
        text: `
        <b>1) OMEPRAZOL 20mg</b>
        <p>Tomar 1 comprimido 30 minutos antes do café da manhã por 30 dias</p>
        <br>
        <b>2) DOMPERIDONA 10mg</b>
        <p>Tomar 1 comprimido 15 minutos antes das refeições (máximo 3 vezes ao dia) por 30 dias</p>
        <br><br><br>
        <b>ORIENTAÇÕES GERAIS:</b>
        <p>1) Cabeceira elevada ao deitar;</p>
        <p>2) Não comer até 2 horas antes de deitar;</p>
        <p>3) Evitar refeições muito volumosas;</p>
        <p>4) Evitar alimentos que agravem sintomas como: café, chocolate, cítricos, alimentos condimentados, bebidas alcoólicas, refrigerantes, alimentos gordurosos.</p>
        `
    },
    {
        diagnosis: 'J00',
        text: `
        <b>1) IBUPROFENO 300mg</b>
        <p>Tomar 2 comprimidos cada 8h por 5 dias</p>
        <br>
        <b>2) DIPIRONA 500mg</b>
        <p>Tomar 2 comprimidos cada 8h se dor ou febre</p>
        <br>
        <b>3) LORATADINA 10mg</b>
        <p>Tomar 1 comprimido à noite por 5 dias</p>
        <br>
        <b>4) EXPEC XAROPE</b>
        <p>Tomar 5ml cada 6h por 5 dias</p>
        <br>
        <b>5) STREPSILS 8.75mg ou CIFLOGEX 3mg</b>
        <p>Tomar 1 pastilha cada 6-8h por 2 dias se dor de garganta</p>
        `
    },
    {
        diagnosis: 'A09',
        text: `
        <b>1) DIPIRONA 500mg</b>
        <p>Tomar 2 comprimidos cada 8h se dor ou febre</p>
        <br>
        <b>2) DIMENIDRINATO GOTAS 25mg</b>
        <p>Tomar 40 gotas cada 8h se náuseas ou vômitos</p>
        <br>
        <b>3) SACCHAROMYCES BOULARDII 200mg (FLORATIL)</b>
        <p>Tomar 1 comprimido cada 12h por 3 dias</p>
        <br>
        <b>4) SORO DE REIDRATAÇÃO ORAL (SRO)</b>
        <p>Dissolver 1 envelope em 1 litro de água filtrada e beber durante o dia</p>
        `
    },
    {
        diagnosis: 'A90',
        text: `
        <b>1) DIPIRONA 1g OU PARACETAMOL 750mg</b>
        <p>Tomar 1 comprimido cada 8 horas se dor ou febre</p>
        <br>
        <b>2) METOCLOPRAMIDA 10mg</b>
        <p>Tomar 1 comprimido cada 8 horas se náuseas ou vômitos</p>
        <br>
        <b>3) OMEPRAZOL 20mg</b>
        <p>Tomar 1 comprimido 30 minutos antes do café da manhã por 15 dias</p>
        <br>
        <b>4) LORATADINA 10mg</b>
        <p>Tomar 1 comprimido uma vez ao dia se coceira</p>
        <br>
        <b>5) SORO DE REIDRATAÇÃO ORAL (SRO)</b>
        <p>Dissolver 1 envelope em 1 litro de água filtrada e beber durante o dia</p>
        <br><br><br>
        <b>RETORNAR À UNIDADE SE SINAIS DE ALARME:</b>
        <p>• Dor na barriga intensa e contínua</p>
        <p>• Vômitos persistentes</p>
        <p>• Sangramento na gengiva, nariz, fezes ou urina</p>
        <p>• Sensação de desmaio</p>
        <p>• Pressão baixa ou batimentos acelerados do coração</p>
        <p>• Cansaço extremo, irritabilidade ou sonolência continua</p>
        <p>• Dor de cabeça intensa</p>
        <p>• Diminuição na quantidade do xixi</p>
        <p>• Persistência da febre após 5º dia de sintomas</p>
        `
    },
    {
        diagnosis: 'N30',
        text: `
        <b>1) NITROFURANTOÍNA 100mg</b>
        <p>Tomar 1 comprimido cada 6 horas por 5 dias</p>
        <br>
        <b>2) FENAZOPIRIDINA 200mg</b>
        <p>Tomar 1 comprimido cada 8 horas por 5 dias</p>
        <br>
        <b>3) IBUPROFENO 300mg</b>
        <p>Tomar 2 comprimidos cada 8 horas por 4 dias</p>
        <br><br><br>
        <b>ORIENTAÇÕES:</b>
        <p>1) A FENAZOPIRIDINA pode deixar a urina ALARANJADA, não se assustar. 2) Se presença de sangue vivo na urina, retornar ao médico</p>
        `
    },
    {
        diagnosis: 'J45',
        text: `
        <b>1) SALBUTAMOL 100mcg</b>
        <p>Aplicar 2 jatos via oral cada 4-6 horas</p>
        <br>
        <b>2) BECLOMETASONA + FORMOTEROL 200mcg/6mcg</b>
        <p>Aplicar 1 jato via oral cada 6 horas</p>
        <br>
        <b>3) PREDNISONA 20mg</b>
        <p>Tomar 1 comprimido uma vez ao dia por 5 dias</p>
        <br><br><br>
        <b>ORIENTAÇÕES:</b>
        <p>1) Use o espaçador ao aplicar o SALBUTAMOL.</p>
        <p>2) Enxague a boca toda vez que usar BECLOMETASONA+FORMOTEROL</p>
        `
    },
    {
        diagnosis: 'L089',
        text: `
        <b>1) CEFALEXINA 500mg</b>
        <p>Tomar 1 comprimido cada 6 horas por 10 dias</p>
        <br>
        <b>2) IBUPROFENO 300mg</b>
        <p>Tomar 2 comprimidos cada 8 horas por 10 dias</p>
        <br>
        <b>3) MUPIROCINA 20mg</b>
        <p>Aplicar em região de feridas cada 8 horas por 10 dias</p>
        `
    },
]
