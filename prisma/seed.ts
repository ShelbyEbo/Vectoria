import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main()
{
    const eletromag = await prisma.area.upsert({
        where: { slug: 'eletromag' },
        update: {},
        create: {
            slug: 'eletromag',
            name: 'Eletromagnetismo',
            description: 'Estudos sobre a relação entre eletricidade e magnetismo',
            order: 1
        }
    })
    const mecanica = await prisma.area.upsert({
        where: { slug: 'mecanica' },
        update: {},
        create: {
            slug: 'mecanica',
            name: 'Mecânica',
            description: 'Estudos sobre os movimentos dos corpos e o repouso, bem como as forças e a energia que atuam sobre eles',
            order: 2
        }
    })
    const ondulatoria = await prisma.area.upsert({
        where: { slug: 'ondulatoria' },
        update: { name: 'Ondulatória', slug: 'ondulatoria' },
        create: {
            slug: 'ondas',
            name: 'Ondas',
            description: 'Análises de qualquer perturbação ou oscilação que se propaga pelo espaço ou através de um meio',
            order: 3
        }
    })
    const optica = await prisma.area.upsert({
        where: { slug: 'optica' },
        update: {},
        create: {
            slug: 'optica',
            name: 'Óptica',
            description: 'Estudos sobre a luz, seus comportamentos, propriedades e as interações com a matéria',
            order: 4
        }
    })
    const termodinamica = await prisma.area.upsert({
        where: { slug: 'termodin' },
        update: {slug: 'termodin'},
        create: {
            slug: 'termodin',
            name: 'Termodinâmica',
            description: 'Estudos sobre as relações entre o calor, o trabalho e a energia',
            order: 5
        }
    })

    const eletrodinamica = await prisma.topic.upsert({
        where: { slug: 'eletrodin' },
        update: {},
        create: {
            slug: 'eletrodin',
            name: 'Eletrodinâmica',
            areaId: eletromag.id,
            order: 1
        }
    })

    const eletrostatica = await prisma.topic.upsert({
        where: { slug: 'eletrostat' },
        update: {},
        create: {
            slug: 'eletrostat',
            name: 'Eletrostática',
            areaId: eletromag.id,
            order: 2
        }
    })

    const cinematica = await prisma.topic.upsert({
        where: { slug: 'cinematica' },
        update: {},
        create: {
            slug: 'cinematica',
            name: 'Cinemática',
            areaId: mecanica.id,
            order: 1
        }
    })

    const dinamica = await prisma.topic.upsert({
        where: { slug: 'dinamica' },
        update: {},
        create: { 
            slug: 'dinamica',
            name: 'Dinâmica',
            areaId:  mecanica.id,
            order: 2
        }
    })

    const ondas = await prisma.topic.upsert({
        where: { slug: 'ondas' },
        update: {},
        create: { 
            slug: 'ondas',
            name: 'Ondas',
            areaId:  ondulatoria.id,
            order: 1
        }
    })

    const oscilacoes = await prisma.topic.upsert({
        where: { slug: 'oscilacoes' },
        update: {},
        create: { 
            slug: 'oscilacoes',
            name: 'Oscilações',
            areaId:  ondulatoria.id,
            order: 2
        }
    })

    const optica_geom = await prisma.topic.upsert({
        where: { slug: 'opt_geom' },
        update: {},
        create: { 
            slug: 'opt_geom',
            name: 'Óptica geométrica',
            areaId:  optica.id,
            order: 1
        }
    })

    const gases = await prisma.topic.upsert({
        where: { slug: 'gases' },
        update: {},
        create: { 
            slug: 'gases',
            name: 'Gases',
            areaId:  termodinamica.id,
            order: 1
        }
    })

    const processos = await prisma.topic.upsert({
        where: { slug: 'process' },
        update: {},
        create: { 
            slug: 'process',
            name: 'Processos termodinâmicos',
            areaId:  termodinamica.id,
            order: 2
        }
    })

    const transferencia = await prisma.topic.upsert({
        where: { slug: 'transfer' },
        update: {},
        create: { 
            slug: 'transfer',
            name: 'Transferências de calor',
            areaId:  termodinamica.id,
            order: 3
        }
    })

    // 15. Campo elétrico
  await prisma.simulation.upsert({
    where:  { slug: 'eletrostatica/campo-eletrico' },
    update: {},
    create: {
      slug:        'eletrostatica/campo-eletrico',
      name:        'Campo Elétrico',
      description: 'campo-eletrico.desc',
      topicId:     eletrostatica.id,
      order:       1,
      published:   true,
      parameters: {
        q1: { type: 'number', min: -10e-6, max: 10e-6, default: 2e-6,  unit: 'C' },
        q2: { type: 'number', min: -10e-6, max: 10e-6, default: -2e-6, unit: 'C' },
        r:  { type: 'number', min: 0.1,    max: 10,    default: 2,     unit: 'm' },
      }
    }
  })
 
  // 16. Circuito RC
  await prisma.simulation.upsert({
    where:  { slug: 'eletrodinamica/circuito-rc' },
    update: {},
    create: {
      slug:        'eletrodinamica/circuito-rc',
      name:        'circuito-rc',
      description: 'circuito-rc.desc',
      topicId:     eletrodinamica.id,
      order:       1,
      published:   true,
      parameters: {
        v0:      { type: 'number', min: 1,    max: 24,    default: 12,   unit: 'V'  },
        r:       { type: 'number', min: 100,  max: 100000,default: 1000, unit: 'Ω'  },
        c:       { type: 'number', min: 1e-6, max: 1e-2,  default: 1e-3, unit: 'F'  },
        modo:    { type: 'select', options: ['carga', 'descarga'], default: 'carga'  },
        duracao: { type: 'number', min: 0.1,  max: 60,    default: 10,   unit: 's'  },
      }
    }
  })

    await prisma.simulation.upsert({
        where: { slug: 'cinematica/mru-mruv' },
        update: {},
        create: {
            slug: 'cinematica/mru-mruv',
            name: 'MRU e MRUV',
            description: 'Movimento Rectilíneo Uniforme e Uniformemente Variado',
            topicId: cinematica.id,
            order: 1,
            published: true,
            parameters: {
                tipo:    { type: 'select', options: ['MRU', 'MRUV'], default: 'MRUV' },
                s0:      { type: 'number', min: 0,   max: 500, default: 0,   unit: 'm'    },
                v0:      { type: 'number', min: -100, max: 100,  default: 20,  unit: 'm/s'  },
                a:       { type: 'number', min: -50, max: 50,  default: -4,  unit: 'm/s²' },
                duracao: { type: 'number', min: 1,   max: 60,  default: 5,   unit: 's'    },
            }
        }
    })

     // 2. Lançamento de projétil
  await prisma.simulation.upsert({
    where:  { slug: 'cinematica/projecteis' },
    update: {},
    create: {
      slug:        'cinematica/projecteis',
      name:        'Projétil',
      description: 'Lançamento de projectéis',
      topicId:     cinematica.id,
      order:       2,
      published:   true,
      parameters: {
        v0:      { type: 'number', min: 1,  max: 200, default: 30, unit: 'm/s' },
        angulo:  { type: 'number', min: 1,  max: 90,  default: 45, unit: '°'   },
        g:       { type: 'number', min: 1,  max: 25,  default: 9.8, unit: 'm/s²' },
        duracao: { type: 'number', min: 1,  max: 30,  default: 6,  unit: 's'   },
      }
    }
  })
 
  // 3. Queda livre
  await prisma.simulation.upsert({
    where:  { slug: 'cinematica/queda-livre' },
    update: {},
    create: {
      slug:        'cinematica/queda-livre',
      name:        'Queda Livre',
      description: 'Corpos em queda livre',
      topicId:     cinematica.id,
      order:       3,
      published:   true,
      parameters: {
        h0:      { type: 'number', min: 1,   max: 500, default: 100, unit: 'm'    },
        v0:      { type: 'number', min: 0,   max: 50,  default: 0,   unit: 'm/s'  },
        g:       { type: 'number', min: 1,   max: 25,  default: 9.8, unit: 'm/s²' },
        duracao: { type: 'number', min: 1,   max: 30,  default: 5,   unit: 's'    },
      }
    }
  })
 
  // 4. Plano inclinado
  await prisma.simulation.upsert({
    where:  { slug: 'dinamica/plano-inclinado' },
    update: {},
    create: {
      slug:        'dinamica/plano-inclinado',
      name:        'Plano Inclinado',
      description: 'Aplicação das leis de Newton no plano inclinado',
      topicId:     dinamica.id,
      order:       1,
      published:   true,
      parameters: {
        massa:      { type: 'number', min: 1,   max: 75,  default: 10,  unit: 'kg'  },
        angulo:     { type: 'number', min: 1,   max: 90,  default: 30,  unit: '°'   },
        muEstatico: { type: 'number', min: 0,   max: 1,   default: 0.4, unit: ''    },
        muCinetico: { type: 'number', min: 0,   max: 1,   default: 0.3, unit: ''    },
      }
    }
  })
 
  // 5. Colisão 1D
  await prisma.simulation.upsert({
    where:  { slug: 'dinamica/colisoes' },
    update: {},
    create: {
      slug:        'dinamica/colisoes',
      name:        'Colisões',
      description: 'Colisões elásticas, inelásticas e perfeitamente inelásticas',
      topicId:     dinamica.id,
      order:       2,
      published:   true,
      parameters: {
        m1:    { type: 'number', min: 0.1, max: 100, default: 5,  unit: 'kg'  },
        m2:    { type: 'number', min: 0.1, max: 100, default: 3,  unit: 'kg'  },
        v1i:   { type: 'number', min: -50, max: 50,  default: 10, unit: 'm/s' },
        v2i:   { type: 'number', min: -50, max: 50,  default: -4, unit: 'm/s' },
        tipo:  { type: 'select', options: ['elastica', 'inelastica', 'perfeitamente-inelastica'], default: 'elastica' },
      }
    }
  })
 
  // 6. Pêndulo simples
  await prisma.simulation.upsert({
    where:  { slug: 'oscilacoes/pendulo' },
    update: {},
    create: {
      slug:        'oscilacoes/pendulo',
      name:        'Pêndulo Simples',
      description: 'Aplicação do MHS no pêndulo',
      topicId:     oscilacoes.id,
      order:       1,
      published:   true,
      parameters: {
        comprimento: { type: 'number', min: 0.1, max: 10,  default: 1,  unit: 'm'  },
        amplitude:   { type: 'number', min: 1,   max: 45,  default: 15, unit: '°'  },
        g:           { type: 'number', min: 1,   max: 25,  default: 9.8, unit: 'm/s²' },
        duracao:     { type: 'number', min: 1,   max: 30,  default: 10, unit: 's'  },
      }
    }
  })
 
  // 7. MHS
  await prisma.simulation.upsert({
    where:  { slug: 'oscilacoes/mhs' },
    update: {},
    create: {
      slug:        'oscilacoes/mhs',
      name:        'Movimento Harmônico Simples (MHS)',
      description: 'Oscilações simples',
      topicId:     oscilacoes.id,
      order:       2,
      published:   true,
      parameters: {
        a:       { type: 'number', min: 0.1, max: 10,  default: 2, unit: 'm'   },
        t:       { type: 'number', min: 0.1, max: 10,  default: 3, unit: 's'   },
        phi:     { type: 'number', min: 0,   max: 360, default: 0, unit: '°'   },
        duracao: { type: 'number', min: 1,   max: 30,  default: 9, unit: 's'   },
      }
    }
  })
 
  // 8. Onda transversal
  await prisma.simulation.upsert({
    where:  { slug: 'ondas/onda-transversal' },
    update: {},
    create: {
      slug:        'ondas/onda-transversal',
      name:        'Ondas Transversais',
      description: 'onda-transversal.desc',
      topicId:     ondulatoria.id,
      order:       1,
      published:   true,
      parameters: {
        amplitude:   { type: 'number', min: 0.1, max: 5,   default: 1,  unit: 'm'  },
        frequencia:  { type: 'number', min: 0.1, max: 100,  default: 1,  unit: 'Hz' },
        velocidade:  { type: 'number', min: 1,   max: 100, default: 10, unit: 'm/s'},
        duracao:     { type: 'number', min: 1,   max: 20,  default: 5,  unit: 's'  },
      }
    }
  })

  // 12. Refração (Lei de Snell)
  await prisma.simulation.upsert({
    where:  { slug: 'opt_geom/refracao' },
    update: {},
    create: {
      slug:        'opt_geom/refracao',
      name:        'Refração',
      description: 'refracao.desc',
      topicId:     optica_geom.id,
      order:       1,
      published:   true,
      parameters: {
        n1:          { type: 'number', min: 1,  max: 3,  default: 1,   unit: ''  },
        n2:          { type: 'number', min: 1,  max: 3,  default: 1.5, unit: ''  },
        anguloEntrada: { type: 'number', min: 0, max: 89, default: 45,  unit: '°' },
      }
    }
  })
 
  // 13. Lente delgada
  await prisma.simulation.upsert({
    where:  { slug: 'opt_geom/lente-delgada' },
    update: {},
    create: {
      slug:        'opt_geom/lente-delgada',
      name:        'Lente Delgada',
      description: 'lente-delgada.desc',
      topicId:     optica_geom.id,
      order:       2,
      published:   true,
      parameters: {
        tipo:   { type: 'select', options: ['convergente', 'divergente'], default: 'convergente' },
        f:      { type: 'number', min: 0.1, max: 5,  default: 2, unit: 'm' },
        ho:     { type: 'number', min: 0.1, max: 5,  default: 1, unit: 'm' },
        do:     { type: 'number', min: 0.1, max: 20, default: 5, unit: 'm' },
      }
    }
  })
 
  // 14. Espelho
  await prisma.simulation.upsert({
    where:  { slug: 'opt_geom/espelho' },
    update: {},
    create: {
      slug:        'opt_geom/espelho',
      name:        'Espelhos',
      description: 'espelho.desc',
      topicId:     optica_geom.id,
      order:       3,
      published:   true,
      parameters: {
        tipo: { type: 'select', options: ['concavo', 'convexo'], default: 'concavo' },
        f:    { type: 'number', min: 0.1, max: 5,  default: 2, unit: 'm' },
        ho:   { type: 'number', min: 0.1, max: 5,  default: 1, unit: 'm' },
        do:   { type: 'number', min: 0.1, max: 20, default: 5, unit: 'm' },
      }
    }
  })
 
  // 9. Gás ideal
  await prisma.simulation.upsert({
    where:  { slug: 'gases/gas-ideal' },
    update: {},
    create: {
      slug:        'gases/gas-ideal',
      name:        'Gás ideal',
      description: 'gas-ideal.desc',
      topicId:     gases.id,
      order:       1,
      published:   true,
      parameters: {
        n:          { type: 'number', min: 0.1, max: 10,   default: 1,   unit: 'mol' },
        temperatura:{ type: 'number', min: 1,   max: 1000, default: 300, unit: 'K'   },
        volume:     { type: 'number', min: 0.1, max: 100,  default: 1,   unit: 'L'   },
        processo:   { type: 'select', options: ['isocórico', 'isobárico', 'isotérmico', 'adiabático'], default: 'isotérmico' },
      }
    }
  })
 
  // 10. Expansão isotérmica
  await prisma.simulation.upsert({
    where:  { slug: 'process/expansao' },
    update: {},
    create: {
      slug:        'process/expansao',
      name:        'Expansão Isotérmica',
      description: 'expansao-isotermica.desc',
      topicId:     processos.id,
      order:       2,
      published:   true,
      parameters: {
        n:           { type: 'number', min: 0.1, max: 10,   default: 1,   unit: 'mol' },
        temperatura: { type: 'number', min: 100, max: 1000, default: 300, unit: 'K'   },
        vi:          { type: 'number', min: 0.1, max: 50,   default: 1,   unit: 'L'   },
        vf:          { type: 'number', min: 0.1, max: 100,  default: 5,   unit: 'L'   },
      }
    }
  })
 
  // 11. Condução de calor
  await prisma.simulation.upsert({
    where:  { slug: 'transfer/conducao-calor' },
    update: {},
    create: {
      slug:        'transfer/conducao',
      name:        'Condução de Calor',
      description: 'conducao.desc',
      topicId:     transferencia.id,
      order:       1,
      published:   true,
      parameters: {
        material:   { type: 'select', options: ['cobre', 'aluminio', 'ferro', 'vidro', 'madeira'], default: 'cobre' },
        t1:         { type: 'number', min: 0,    max: 1000, default: 300, unit: '°C' },
        t2:         { type: 'number', min: -100, max: 500,  default: 20,  unit: '°C' },
        espessura:  { type: 'number', min: 0.001,max: 1,    default: 0.1, unit: 'm'  },
        area:       { type: 'number', min: 0.001,max: 1,    default: 0.01,unit: 'm²' },
        duracao:    { type: 'number', min: 1,    max: 300,  default: 60,  unit: 's'  },
      }
    }
  })
}

main().catch(console.error).finally(() => prisma.$disconnect())