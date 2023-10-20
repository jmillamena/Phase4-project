"""adds grades to many to many

Revision ID: a3c4e4f483bb
Revises: 05c988439d6b
Create Date: 2023-10-20 06:15:20.118104

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a3c4e4f483bb'
down_revision = '05c988439d6b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('student_subject_association', schema=None) as batch_op:
        batch_op.add_column(sa.Column('grade', sa.String(), nullable=True))
        batch_op.drop_column('professor')

    with op.batch_alter_table('students', schema=None) as batch_op:
        batch_op.create_foreign_key(batch_op.f('fk_students_pet_id_pets'), 'pets', ['pet_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_students_wand_id_wands'), 'wands', ['wand_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('students', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_students_wand_id_wands'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_students_pet_id_pets'), type_='foreignkey')

    with op.batch_alter_table('student_subject_association', schema=None) as batch_op:
        batch_op.add_column(sa.Column('professor', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('grade')

    # ### end Alembic commands ###
